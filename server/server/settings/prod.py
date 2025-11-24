from .base import *
from dotenv import load_dotenv

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

# DEBUG is set to false for production mode
DEBUG = False

# if not DEBUG:
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
