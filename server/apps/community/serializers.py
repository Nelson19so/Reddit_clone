from rest_framework import serializers
from .models import Community, BlogPost, Comment

# recursive filed for comment infinity nesting replies
class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

# Comment Serializer
class CommentSerializer(serializers.Serializer):
    replies = RecursiveField(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'parent', 'replies', 'created_at']
        read_only_fields = ['author', 'replies', 'created_at']

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)