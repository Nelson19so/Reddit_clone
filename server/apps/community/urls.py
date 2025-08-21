from django.urls import path
from .views import (
    PostCommentView,      CommunityDetailView,
    CommunityListView,    CommunityUpdateDelete,
    CommunityViewCreate,  BlogPostVoteApiView,
    BloPostCreateApiView, BlogPostUpdateDeleteApiView,
    BlogPostListApiView,  CommunityBlogPostListApiView,
    DisplayMembersCommunityApiView, BlogPostDetailsApiView,
    LeaveCommunityView,   JoinCommunityViewCreate
)

urlpatterns = [
    path('comment/post/', PostCommentView.as_view(), name='post_comment'),
    path('community-details/<slug:slug>/', CommunityDetailView.as_view(), name='community_detail'),
    path('community-list/', CommunityListView.as_view(), name='community_list'),
    path('update_delete/', CommunityUpdateDelete.as_view(), name='community_updated_delete'),
    path('create/', CommunityViewCreate.as_view(), name='community_create'),
    path('blogpost/vote/<slug:slug>/', BlogPostVoteApiView.as_view(), name='blogpost_vote'),
    path('blogpost/create/<slug:slug>/', BloPostCreateApiView.as_view(), name='blog_post_view'),
    path(
        'blogpost/update_delete/<slug:slug>/',
        BlogPostUpdateDeleteApiView.as_view(), name='update_delete_blogpost'
    ),
    path('blogpost/', BlogPostListApiView.as_view(), name='BlogPostList'),
    path(
        '<slug:community_slug>/blogpost/',
        CommunityBlogPostListApiView.as_view(), name='community_blogpost'
    ),
    path('blogpost/<slug:slug>/', BlogPostDetailsApiView.as_view(), name='blogpost_details'),
    path('community-user/', DisplayMembersCommunityApiView.as_view(), name='members-community'),
    path('leave-community/<slug:slug>/', LeaveCommunityView.as_view(), name='leave_community'),
    path('join-community/<slug:slug>/', JoinCommunityViewCreate.as_view(), name='leave_community')
]
