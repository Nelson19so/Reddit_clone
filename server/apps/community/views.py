from django.shortcuts import get_object_or_404
from rest_framework   import generics, status
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
)
from .serializers     import (
    CommentSerializer, CommunitySerializer, 
    VoteSerializerCreate, BlogPostCreateSerializer,
    BlogPostSerializer
)
from .models import BlogPost, Comment, Community
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http          import Http404
from django.contrib.auth  import get_user_model
from rest_framework.parsers import MultiPartParser
from rest_framework.exceptions import ValidationError


# getting user model
User = get_user_model()


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
        serializer = self.get_serializer(
            data=self.request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({
            'message': 'Comment created successfully',
            'data': serializer.data,
        }, status=status.HTTP_201_CREATED)


# community view create
class CommunityViewCreate(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    # handles post for creating community
    def post(self, request):
        serializer = CommunitySerializer(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'message': 'community created successfully',
            'success': True,
            'data': serializer.data,
        }, status=status.HTTP_201_CREATED)


# Delete and update community view
class CommunityUpdateDelete(APIView):
    permission_classes = [IsAuthenticated]
    
    # handles update
    def put(self, request, slug):
        try:
           
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

        except Community.DoesNotExist:
            return Response({
                'message': 'No community was found',
                'success': False,
            }, status=status.HTTP_400_BAD_REQUEST)

    # handles update
    def patch(self, request, slug):
        try:
           
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

        except Community.DoesNotExist:
            return Response({
                'message': 'No community was found',
                'success': False,
            }, status=status.HTTP_400_BAD_REQUEST)
    
    # delete the community
    def delete(self, request, slug):
        try:

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
        
        except Community.DoesNotExist:
            return Response({
                'message': 'No community was found',
                'success': False,
            }, status=status.HTTP_400_BAD_REQUEST)


# join community  view
class JoinCommunityViewCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        try:

            community = get_object_or_404(Community, slug=slug)
            community.members.add(request.user)
            
            return Response({
                'message': f'You have successfully joined {community.name} community',
                'success': True,
            }, status=status.HTTP_200_OK)
        
        except Community.DoesNotExist:
            return Response({
                'message': 'No community was found',
                'success': False,
            }, status=status.HTTP_400_BAD_REQUEST)


# leave community view
class LeaveCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        try:

            community = get_object_or_404(Community, slug=slug)
            community.members.remove(request.user)
            
            return Response({
                'message': f'You have successfully left {community.name} community',
                'success': True,
            }, status=status.HTTP_200_OK)
        
        except Community.DoesNotExist:
            return Response({
                'message': 'No community was found',
                'success': False,
            }, status=status.HTTP_400_BAD_REQUEST)


# community list view
class CommunityListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        communities = Community.objects.all().prefetch_related('community_posts')
        serializer = CommunitySerializer(communities, many=True, context={'request': request})
        
        return Response(serializer.data, status=status.HTTP_200_OK)


# community detail
class CommunityDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    lookup_field = 'slug'


# Blog Post vote api view create
class BlogPostVoteApiView(generics.CreateAPIView):
    serializer_class = VoteSerializerCreate
    permission_classes = [IsAuthenticated]

    def post(self, request, slug, *args, **kwargs):
        try:

            post = generics.get_object_or_404(BlogPost, slug=slug)
            user = request.user

            serializer = self.get_serializer(
                data=request.data,
                context={
                    'post': post, 'user': user,
                    'request': request,
                }
            )

            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({
                'success': True,
                'message': 'You have successfully vote'
            }, status=status.HTTP_200_OK)

        except BlogPost.DoesNotExist:
            return Response({
                'success': False,
                'message': 'No Blogpost was found'
            }, status=status.HTTP_400_BAD_REQUEST)


# blog post api view create
class BloPostCreateApiView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlogPostCreateSerializer
    parser_classes = [MultiPartParser]

    def perform_create(self, serializer):
        author = self.request.user
        community_slug = self.kwargs.get('slug')

        community = get_object_or_404(Community, slug=community_slug)

        if not community.members.filter(id=author.id).exists():
            raise ValidationError({'community': 'You are not a member of this community'})
        
        blogpost = serializer.save(author=author)
        blogpost.community.set([community])

    # handle post request from users
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        return Response({
            'success': True,
            'message': 'You have successfully posted a blog post',
        }, status=status.HTTP_201_CREATED)


# blog post update and delete api view
class BlogPostUpdateDeleteApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_object(self, slug):
        try:
            
            return BlogPost.objects.get(slug=slug)
            
        except BlogPost.DoesNotExist():
            return Http404
    
    # replace an existing data with a new one (put)
    def put(self, request, slug, format=None):
        blogpost = self.get_object(slug)
        serializer = BlogPostSerializer(blogpost, data=request.data)

        if request.user == blogpost.author:
            if serializer.is_valid():
                serializer.save()
                
                return Response({
                    'success': True,
                    'message': 'You have successfully updated your blog post',
                }, serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(status=status.HTTP_403_FORBIDDEN)

    # replace some of the existing data with a new one (patch)
    def patch(self, request, slug, format=None):
        blogpost = self.get_object(slug)
        serializer = BlogPostSerializer(blogpost, data=request.data)
        
        if request.user == blogpost.author:
            if serializer.is_valid():
                serializer.save()
                
                return Response({
                    'success': True,
                    'message': 'You have successfully updated your blog post',
                }, serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_403_FORBIDDEN)
    
    # user delete blog post
    def delete(self, request, slug, format=None):
        blogpost = self.get_object(slug)
        
        if request.user == blogpost.author:
            blogpost.delete()
            
            return Response({
                'success': True,
                'message': 'You have successfully delete your blog post',
            }, status=status.HTTP_204_NO_CONTENT)
        
        return Response(status=status.HTTP_403_FORBIDDEN)


# general blog post list for all users
class BlogPostListApiView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = BlogPost.objects.all().order_by('created_at').prefetch_related('blog_vote')
    serializer_class = BlogPostSerializer


# list community blog post for user
class CommunityBlogPostListApiView(APIView):
    permission_classes = [AllowAny]

    # listing all blogpost related to a community
    def get(self, request, *args, **kwargs):
        community_slug = kwargs.get('community_slug')

        try:

            community = Community.objects.get(slug=community_slug)

        except Community.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Community no found',
            }, status=status.HTTP_404_NOT_FOUND)
        
        blogpost = BlogPost.objects.filter(community=community).only(
            'title', 'slug', 'image', 'community', 'author', 
        )
        serializer = BlogPostSerializer(blogpost, many=True, context={
            'request': request
        })
        
        return Response(serializer.data, status=status.HTTP_200_OK)


# blog post details
class BlogPostDetailsApiView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'


# displays community for members in community for authenticated users
class DisplayMembersCommunityApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        community = Community.objects.filter(members=user)

        if community.exists():
            serializer = CommunitySerializer(community, many=True, context={'request': request})

            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response({
            'success': False,
            'message': 'No subreddit found yet',
        }, status=status.HTTP_404_NOT_FOUND)
  
