from django.urls import path
from .views import (
    UserProfileView, UserRegistrationViewCreate,
    UserLoginViewCreate, LogOutUserView, 
    UserDeleteViewCreate, UserTokenVerifyView,
    CustomTokenRefreshView,
) 

# api url configuration
urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('register/', UserRegistrationViewCreate.as_view(), name='signup_user'),
    path('login/', UserLoginViewCreate.as_view(), name='login_user'),
    path('logout/', LogOutUserView.as_view(), name='logout_user'),
    path('delete-account/', UserDeleteViewCreate.as_view(), name='delete_user_account'),
    path('token/verify/', UserTokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]
