# from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import CommentSerializer
from .models import BlogPost, Comment
from rest_framework.response import Response

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


