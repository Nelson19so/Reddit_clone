from .base import *
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api

load_dotenv()

# CORSE ALLOWED ORIGIN for production mode
CORS_ALLOWED_ORIGINS = [
    "https://reddit-clone-sand-phi.vercel.app",
]

# ALLOWED HOST for production mode
ALLOWED_HOSTS = [
    'reddit-clone-5uvr.onrender.com'
]

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# PostgreSql Database configuration for production 

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': '5432',
        'OPTIONS': {
            'sslmode': 'require',
        }
    }
}

# cloudinary config
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('CLOUD_API_KEY'),
    api_secret=os.getenv('CLOUD_API_SECRET'),
)

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUD_NAME'),
    'API_KEY': os.getenv('CLOUD_API_KEY'),
    'API_SECRET': os.getenv('CLOUD_API_SECRET'),
}

# Use Cloudinary for media uploads
# MEDIA_URL = '/media/'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# DEBUG is set to false for production mode
DEBUG = False

# if not DEBUG:
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

