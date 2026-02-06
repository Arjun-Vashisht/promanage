from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from core.tasks import log_activity

from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(APIView):

    def get(self, request):
        project_id = request.query_params.get('project_id')

        if project_id:
            tasks = Task.objects.filter(project_id=project_id)
        else:
            tasks = Task.objects.all()

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            task = serializer.save()
            print("CELERY TASK TRIGGERED")
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

        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            log_activity.delay(
                action="TASK_UPDATED",
                user_id=request.user.id if request.user.is_authenticated else None,
                meta={
                    "task_id": task.id,
                    "updated_fields": list(request.data.keys())
                }
            )
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )