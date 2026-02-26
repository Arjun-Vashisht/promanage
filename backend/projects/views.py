from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Project
from .serializers import ProjectSerializer
from django.shortcuts import get_object_or_404


class ProjectListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)

        if serializer.is_valid():
            project = serializer.save(owner=request.user)
            return Response(
                ProjectSerializer(project).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        project = get_object_or_404(
            Project,
            pk=pk,
        )
        print("Deleting project:", project.name)
        project.delete()

        return Response(
            {"message": "Project deleted"},
            status=status.HTTP_204_NO_CONTENT
        )

    def patch(self, request, pk):

        project = get_object_or_404(
            Project,
            pk=pk,
            owner=request.user
        )

        serializer = ProjectSerializer(
            project,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )