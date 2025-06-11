from django.urls import path
from .views import (
    UserProfileView, UserRegistrationViewCreate,
    UserLoginViewCreate, LogOutUserView, 
    UserDeleteViewCreate, TokenVerifyView
)

# api url configuration
urlpatterns = [
    path('profile/<int:pk>/', UserProfileView.as_view(), name='user_profile'),
    path('signup/', UserRegistrationViewCreate.as_view(), name='signup_user'),
    path('login/', UserLoginViewCreate.as_view(), name='login_user'),
    path('logout/', LogOutUserView.as_view(), name='logout_user'),
    path('user_delete/', UserDeleteViewCreate.as_view(), name='delete_user_account'),
    path('token_verify/', TokenVerifyView.as_view(), name='token_verify'),
]
