from .base import *

# CORSE ALLOWED ORIGIN for development mode
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

# ALLOWED HOST for development mode
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DEBUG is set to True for development mode
DEBUG = True

# media file (images, files)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')