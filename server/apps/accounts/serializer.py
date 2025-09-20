from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Profile
from django.contrib.auth import authenticate

# defines the get user
User = get_user_model()

# user profile serializer create
class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ['pk']

'''''
user registration serializer create
'''''
class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, error_messages={
        'required': 'Email field is required',
        'blank': 'Email field cannot be empty'
    })
    
    password = serializers.CharField(
        write_only=True, required=True, 
         error_messages={
            'required': 'Password field is required',
            'blank': 'Password field cannot be empty'
        },
        validators=[validate_password]
    )

    confirm_password = serializers.CharField(
        write_only=True, required=True,
        error_messages={
            'required': 'Confirm password field is required',
            'blank': 'Confirm password field cannot be empty'
        }
    )

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password']
        read_only_fields = ['username']

    # validates user data and returns data
    def validate(self, data):
        # validate all fields must be required if any empty field
        if not all([data['password'], data['confirm_password'], data['email']]):
            raise serializers.ValidationError({'fields': 'All fields are required'})
        
        # validates if user email exist
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'User with email already exist'})

        if not data['password']:
            raise serializers.ValidationError({'password': 'Password field is required'})

        # validates if user password is validated
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})

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
    username = serializers.EmailField(required=True, write_only=True, error_messages={
        'required': 'Email field is required',
        'blank': 'Email or Username field cannot be empty'
    })
    
    password = serializers.CharField(
        write_only=True, required=True,
         error_messages={
            'required': 'Password field is required',
            'blank': 'Password field cannot be empty'
        },
        validators=[validate_password]
    )

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


