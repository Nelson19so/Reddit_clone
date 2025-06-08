from django.urls import path
from .views import UserProfileView, UserRegistrationViewCreate

urlpatterns = [
    path('profile/<int:pk>/', UserProfileView.as_view(), name='user_profile_view'),
    path('register/', UserRegistrationViewCreate.as_view(), name='user_registration_view'),
]
