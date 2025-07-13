from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from allauth.account.views import LoginView, SignupView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('auth/', include('dj_rest_auth.urls')),
    path('api/accounts/', include('apps.accounts.urls')),
    path('api/accounts/google/', include('allauth.urls')),
    path('api/community/', include('apps.community.urls')),
    path('api/accounts/google/login/', LoginView.as_view(), name='google_login'),
    path('api/accounts/google/signup/', SignupView.as_view(), name='google_signup'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
