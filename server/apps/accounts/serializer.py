from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Profile
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import re
from django.utils.text import slugify
from django.contrib.auth import authenticate

# defines the get user
User = get_user_model()

# user profile serializer create
class UserProfileViewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = ('username', 'email', 'avatar', 'bio')
        read_only = ['id']

'''''
user registration serializer create
'''''
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'confirm_password')

    # validates user data and returns data 
    def validate(self, data):
        # validates if user email exist
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'User with email already exist'})

        # validates if user password is validated
        if data['password'] and data['confirm_password'] and data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        
        # validate all fields must be required if any empty field
        if not data['password'] or not data['confirm_password'] or not data['email']:
            raise serializers.ValidationError({'fields': 'All fields are required'})

        # returns the data for user
        return data

    # function for creating user
    def create(self, validated_data):
        # removes the confirm password from the data we are storing
        validated_data.pop('confirm_password', None)

        # Generate username from email
        email = validated_data.get('email')
        base_username = email.split('@')[0]
        username = base_username
        counter = 1

        # looping if there is any user with this same username
        while CustomUser.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        # passing the username to validated data
        validated_data['username'] = username

        # create user with the validated data
        user = CustomUser.objects.create_user(**validated_data)

        # returns user data and JWT token for usr in the view
        return user

'''''
Login in serializer create
'''''
class UserLoginSerializerCreate(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    # validates the user attempting to log in
    def validate(self, data):
        username_or_email = data.get('username')
        password = data.get('password')

        # authenticating the user by username or email
        user = authenticate(username=username_or_email, password=password)

        # raise error if the user is not valid
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        # returns user for later use in view
        data['user'] = user
        return data


