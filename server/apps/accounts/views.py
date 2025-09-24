# from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views    import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import (
    UserProfileSerializer, UserRegistrationSerializer, 
    UserLoginSerializerCreate
)
from django.contrib.auth     import get_user_model
from rest_framework_simplejwt.tokens     import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views      import TokenRefreshView
from google.oauth2 import id_token
from google.auth.transport import requests
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter


# defining the user
User = get_user_model()


# Google auth for users
class GoogleAuthView(APIView):
    def post(self, request):
        token = request.data.get("token")

        try:
            
            # Verify token with Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request())

            email = idinfo["email"]
            name = idinfo.get("name", email.split("@")[0])

            # Get or create user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={"username": name},
            )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# user mail view page view
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


'''''
user account registration view create
'''''
class UserRegistrationViewCreate(generics.CreateAPIView):
    # serializer class
    serializer_class = UserRegistrationSerializer
    # permission classes to allow anyone to visit this view
    permission_classes = [AllowAny]

    def post(self, request, *args, **Kwargs):
        serializer = self.get_serializer(data=request.data)

        # checks if the serializer is valid
        if serializer.is_valid():
            # saves this user_data serializer
            user = serializer.save()

            # refreshes token for user
            refresh = RefreshToken.for_user(user)

            # returns a json response if successful
            return Response({
                # setting success status to True
                'success': True,
                # passing success message
                'message': 'User created successfully',
                # passing te user data
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                },
                # passing the token to the frontend
                'token': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                },
               # returns a successful success
            }, status=status.HTTP_201_CREATED)

        # returns a json response if not successful
        return Response({
            # setting success status to false
            'success': False,
            'message': serializer.errors
            # returns a bad request status
        }, status=status.HTTP_400_BAD_REQUEST)


'''''
User account log in view create
'''''
class UserLoginViewCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializerCreate(data=request.data)

        # checks if the user details in serializer is valid
        if serializer.is_valid():
            # getting the validated user data
            user = serializer.validated_data['user']

            # refreshes token for user
            refresh = RefreshToken.for_user(user)

            # returns json response once the user is log in
            return Response({
                'success': True,
                'message': 'You have successfully login',
                # passing te user data
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                },
                # passing the token to the frontend
                'token': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                },
            }, status=status.HTTP_200_OK)

        # returns a json response if the use fails
        return Response({
            'success': False,
            'message': serializer.errors
        }, status=status.HTTP_404_NOT_FOUND)


# user log out view for user 
class LogOutUserView(APIView):
    # only allow authenticated users to use this view
    permission_classes = [IsAuthenticated]

    # handles the logic for black listing/logging out user
    def post(self, request):
        try:

            refresh_token = request.data.get['refresh']
            token = RefreshToken(refresh_token)
            # prevent re use
            token.blacklist()
            return Response({
                'success': True,
                'message': 'Logged out successfully'
            }, status=status.HTTP_205_RESET_CONTENT)

        except TokenError:
            return Response({
                'success': False,
                'message': 'Invalid token'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except KeyError:
            return Response({
                'success': False,
                'message': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)


# delete account view create for authenticated users
class UserDeleteViewCreate(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    # making sure we are getting the user currently logged in
    def get_object(self):
        return self.request.user

    # deleting user and it related content
    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({
            'success': True,
            'message': 'User deleted successfully',
        }, status=status.HTTP_204_NO_CONTENT)


# token verify api view for users
class UserTokenVerifyView(APIView):
    def post(self, request):
        token = request.data.get('token')
        try:
            
            token = AccessToken(token)
            return Response({
                'message': 'Token is valid',
                'success': True,
            }, status=status.HTTP_200_OK)

        except TokenError:
            return Response({
                'success': False,
                'message': 'Invalid or expire token',
            }, status=status.HTTP_401_UNAUTHORIZED)


# custom JWT refreshed access token for user
class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            return Response({
                'success': True,
                'refresh': response.data.get('refresh'),
                'access': response.data.get('access'),
            }, status=status.HTTP_200_OK)

        else:
            return Response({
                'success': False,
                'message': 'Invalid or expired refresh token'
            }, status=status.HTTP_401_UNAUTHORIZED)
