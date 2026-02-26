from django.urls import path
from .views import UserProfileView, UserListView

urlpatterns = [
    path("profile/", UserProfileView.as_view()),
    path("list/", UserListView.as_view()),
]
