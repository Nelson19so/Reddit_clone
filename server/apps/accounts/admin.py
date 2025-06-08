from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

# custom user
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    readonly_fields = ('pk', 'date_joined', 'last_login')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal Info'), {'fields': ('email', 'terms_accepted')}),
        (_('Permissions'), {'fields': (
            'is_active', 'is_staff', 
            'is_superuser', 'groups', 
            'user_permissions'
        )}),
        (_('Important Dates'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'terms_accepted', 'password1', 'password2'),
        }),
    )

    search_fields = ('username', 'email')
    ordering = ('username',)

