from django.contrib import admin
from .models import Community, BlogPost, BlogPostCategory


@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    fields = ('name', 'owner', 'description', 'members', 'slug')
    list_display = ('name', 'owner', 'created', 'updated_at')
    list_filter = ('name', 'owner', 'created', 'updated_at')
    search_fields = ['name']
    readonly_fields = ['slug']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    fields = ('id', 'author', 'community', 'title', 'content', 'image', 'created_at', 'updated_at', 'slug')
    list_display = ('id', 'author', 'title', 'created_at')
    list_filter = ('community', 'title', 'created_at', 'updated_at')
    search_fields = ['title']
    readonly_fields = ['id', 'slug', 'updated_at', 'created_at']

