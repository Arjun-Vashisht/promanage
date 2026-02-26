from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined
        })


class UserListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        users = User.objects.all()

        data = [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
            for user in users
        ]

        return Response(data, status=status.HTTP_200_OK)
