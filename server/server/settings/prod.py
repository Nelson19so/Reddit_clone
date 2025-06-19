from .base import *
from dotenv import load_dotenv

load_dotenv()

# CORSE ALLOWED ORIGIN for production mode
CORS_ALLOWED_ORIGINS = [
    "*",
]

# ALLOWED HOST for production mode
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# PostgreSql Database configuration for production mode

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.getenv('DB_NAME'),         # DB name
#         'USER': os.getenv('DB_USER'),        # DB username
#         'PASSWORD': os.getenv('DB_PASSWORD'),    # DB password
#         'HOST': os.getenv('DB_HOST'),
#         'PORT': os.getenv('DB_PORT'),                 # Default PostgreSQL port
#     }
# }

# sqlite 3 for the demo preview
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DEBUG is set to false for production mode
DEBUG = False

# CORS ALLOW ORIGINS which is set to false for prod
CORS_ALLOW_ALL_ORIGINS = DEBUG

# This only applies in production mode (DEBUG=False)
# if not DEBUG:
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
