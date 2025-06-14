from rest_framework import serializers
from .models import Community, BlogPost, Comment, BlogPostVote

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
        comment = Comment.objects.create(**validated_data)
        return comment
    
# blog post serializer create
class CommunitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = ['id', 'slug', 'name', 'description', 'created_at', 'owner']
        read_only = ['id', 'slug', 'created_at']

    def get_is_members(self, obj):
        request = self.context.get('request')
        return request.user in obj.members.all() if request.is_authenticated else False

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['owner'] = request.user
        return BlogPost.objects.create(**validated_data)

# upvote and downvote serializer create
class VoteSerializerCreate(serializers.ModelSerializer):

    class Meta:
        mode = BlogPostVote
        fields = ['post', 'upvote', 'downvote']

    def validate(self, data):
        if data.get("upvote") and data.get("downvote"):
            raise serializers.ValidationError("You can't upvote and downvote at the same time.")
        return data

    def create(self, validated_data):
        user =self.context.get('user')
        post = self.context.get('post')

        vote, created = BlogPostVote.objects.update_or_create(
            post=post,
            user=user,
            defaults=validated_data
        )

        return vote
        

# blog post create