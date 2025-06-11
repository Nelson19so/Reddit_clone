from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializers import CommentSerializer, CommunitySerializer
from .models import BlogPost, Comment, Community
from rest_framework.response import Response
from rest_framework.views import APIView

# Blog post comment view create
class PostCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    # perform create function for post comment
    def perform_create(self, serializer):
        slug = self.kwargs.get('slug')
        post = generics.get_object_or_404(BlogPost, slug=slug)
        serializer.save(author=self.request.user, post=post)
    
    # handles post comment logics
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'message': 'Comment created successfully',
            'data': serializer.data,
        }, status=status.HTTP_201_CREATED)

# blog post view create
class CommunityViewCreate(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    # handles post for creating community
    def post(self, request):
        serializer = CommunitySerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'message': 'community created successfully',
            'success': True,
        }, serializer.data, status=status.HTTP_201_CREATED)

# Delete and update community view
class CommunityUpdateDelete(APIView):
    # handles update
    def put(self, request, slug):
        community = get_object_or_404(Community, slug=slug)
        if community.owner != request.user:
            return Response({
                'message': 'Not authorized',
                'success': False
            }, status=status.HTTP_403_FORBIDDEN)
        serializer = CommunitySerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # delete the community
    def delete(self, request, slug):
        community = get_object_or_404(Community, slug=slug)
        if community.owner != request.user:
            return Response({
                'message': 'Not authorized',
                'success': False
            }, status=status.HTTP_403_FORBIDDEN)    
        community.delete()
        return Response({
            'message': 'community deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)

# join community  view
class JoinCommunityViewCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        community = get_object_or_404(Community, slug=slug)
        community.members.add(request.user)
        return Response({
            'message': f'You have successfully joined {community.name}',
            'success': True,
        }, status=status.HTTP_200_OK)

# leave community view
class LeaveCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        community = get_object_or_404(Community, slug=slug)
        community.members.remove(request.user)
        return Response({
            'message': f'You have successfully left {community.name}',
            'success': True,
        }, status=status.HTTP_200_OK)

# community list view
class CommunityListView(APIView):

    def get(self, request):
        communities = Community.objects.all()
        serializer = CommunitySerializer(communities, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

# community detail
class CommunityDetailView(generics.RetrieveAPIView):
    queryset = Community.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'slug'

