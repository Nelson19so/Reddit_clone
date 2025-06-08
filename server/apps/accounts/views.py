# from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import UserProfileViewSerializer, UserRegistrationSerializer, UserLoginSerializerCreate
from django.contrib.auth import get_user_model, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser

# defining the user
User = get_user_model()

# user profile view
class UserProfileView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileViewSerializer
    lookup_field = 'pk'

    def get_object(self):
        return self.request.user

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
            # log user in
            login(request, user)

            # refreshes token for user
            refresh = RefreshToken.for_user(user)

            # returns json response once the user is log in
            return Response({
                'success': True,
                'message': 'You have successfully been login',
                'token': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                },
            }, status=status.HTTP_202_ACCEPTED)

        # returns a json response if the use fails
        return Response({
            'success': False,
            'message': serializer.errors
        }, status=status.HTTP_404_NOT_FOUND)

# user log out view create
class LogOutViewCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

# delete account view create for authenticated users
class UserDeleteViewCreate(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    # making sure we are getting the user currently logged in
    def get_object(self):
        return self.request.user
    
    # deleting user
    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({
            'success': True,
            'message': 'User Created successfully',
        }, status=status.HTTP_204_NO_CONTENT)
