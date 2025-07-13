from rest_framework import serializers
from .models import Community, BlogPost, Comment, BlogPostVote
from django.utils.timezone import now
from datetime import timedelta

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
        return request.user in obj.members.all() if request.user.is_authenticated else False

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['owner'] = request.user
        return Community.objects.create(**validated_data)

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
        

# blog post create serializer
class BlogPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogPost
        fields = ['author', 'community', 'title', 'content', 'image']

    # getting the blogpost author returning none if not author
    def get_is_author(self, obj):
        request = self.context.get('request')
        return request.user if obj.author == request.user else None

    # handling the user data validation
    def validate(self, data):
        author = self.context.get('author')
        
        # validating the length of the title
        if len(data['title']) <= 5:
            raise serializers.ValidationError({
                'title': 'Title should be at least up to 5 characters in length'
            })
        
        # validate the length of content
        if len(data['content']) <= 5:
            raise serializers.ValidationError({
                'content': 'Content should be at least up to 5 characters in length'
            })
        
        # restrict how often a user can post to prevent spamming
        five_minute_ago = now() - timedelta(minutes=5)
        
        recent = BlogPost.objects.filter(
            author=author, created_at=five_minute_ago
        )
        if recent.exists():
            raise serializers.ValidationError(
                "You're posting too frequently. Please wait a for 5 more minute to post"
            )
        
    def validate_community(self, value):
        user = self.context.get('author')

        if not user in value.members.filter(id=user.id).exits():
            raise serializers.ValidationError('You are not a member of this community.')
        return value

    # handles the user posting the bog on create
    def create(self, validated_data):
        return BlogPost.objects.get_or_create(**validated_data)

