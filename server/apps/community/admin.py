from django.contrib import admin
from .models import Community

@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    fields = ('name', 'owner', 'description', 'members')
    list_display = ('name', 'owner', 'created', 'updated_at')
    list_filter = ('name', 'owner', 'created', 'updated_at')
    search_fields = ['name']
