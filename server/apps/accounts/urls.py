from django.urls import path
from .views import UserProfileView, UserRegistrationViewCreate, UserLoginViewCreate

urlpatterns = [
    path('profile/<int:pk>/', UserProfileView.as_view(), name='user_profile_view'),
    path('signup/', UserRegistrationViewCreate.as_view(), name='user_signup_view'),
    path('login/', UserLoginViewCreate.as_view(), name='user_login_view'),
]
