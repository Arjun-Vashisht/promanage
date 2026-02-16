from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from core.tasks import log_activity

from .models import Task
from .serializers import TaskSerializer
from django.db import models

class TaskListCreateView(APIView):

    def get(self, request):
        project_id = request.query_params.get('project_id')

        if project_id:
            tasks = Task.objects.filter(
                project_id=project_id
            ).order_by('status', 'order', 'created_at')
        else:
            tasks = Task.objects.all().order_by('status', 'order', 'created_at')

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():

            project_id = serializer.validated_data.get("project").id
            status_val = serializer.validated_data.get("status", "TODO")

            last_task = Task.objects.filter(
                project_id=project_id,
                status=status_val
            ).order_by("-order").first()

            next_order = last_task.order + 1 if last_task else 0

            task = serializer.save(order=next_order)

            log_activity.delay(
                action="TASK_CREATED",
                user_id=request.user.id if request.user.is_authenticated else None,
                meta={
                    "task_id": task.id,
                    "title": task.title,
                    "project_id": task.project_id
                }
            )

            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class TaskDetailView(APIView):

    def patch(self, request, pk):
        task = get_object_or_404(Task, pk=pk)

        old_status = task.status
        old_order = task.order

        new_status = request.data.get("status", old_status)
        new_order = request.data.get("order", old_order)

        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            # If status changed, shift orders in both columns
            if new_status != old_status:

                # shift down tasks in new column
                Task.objects.filter(
                    project=task.project,
                    status=new_status,
                    order__gte=new_order
                ).update(order=models.F("order") + 1)

                # shift up tasks in old column
                Task.objects.filter(
                    project=task.project,
                    status=old_status,
                    order__gt=old_order
                ).update(order=models.F("order") - 1)

            else:
                # same column reorder

                if new_order > old_order:
                    Task.objects.filter(
                        project=task.project,
                        status=old_status,
                        order__gt=old_order,
                        order__lte=new_order
                    ).update(order=models.F("order") - 1)

                elif new_order < old_order:
                    Task.objects.filter(
                        project=task.project,
                        status=old_status,
                        order__gte=new_order,
                        order__lt=old_order
                    ).update(order=models.F("order") + 1)

            updated_task = serializer.save()

            log_activity.delay(
                action="TASK_UPDATED",
                user_id=request.user.id if request.user.is_authenticated else None,
                meta={
                    "task_id": updated_task.id,
                    "updated_fields": list(request.data.keys())
                }
            )

            return Response(
                TaskSerializer(updated_task).data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
