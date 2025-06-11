from django.urls import path
from .views import (
    PostCommentView, CommunityDetailView,
    CommunityListView, CommunityUpdateDelete,
    CommunityViewCreate,
)

urlpatterns = [
    path('comment/post/', PostCommentView.as_view(), name='post_comment'),
    path('<slug:slug>/', CommunityDetailView.as_view(), name='community_detail'),
    path('', CommunityListView.as_view(), name='community_list'),
    path('update_delete/', CommunityUpdateDelete.as_view(), name='community_updated_delete'),
    path('create/', CommunityViewCreate.as_view(), name='community_create')
]
