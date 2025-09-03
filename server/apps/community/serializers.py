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


# community serializer create
class CommunitySerializer(serializers.ModelSerializer):
    is_member = serializers.SerializerMethodField()
    name = serializers.CharField(required=True, error_messages={
        'required': 'Name field is required',
        'blank': 'Name field cannot be empty'
    })
    description = serializers.CharField(required=True, error_messages={
        'required': 'Description field is required',
        'blank': 'Description field cannot be empty'
    })

    class Meta:
        model = Community
        fields = ['id', 'slug', 'name', 'description', 'created', 'owner', 'is_member']
        read_only_fields = ['id', 'slug', 'owner', 'created']

    def get_is_member(self, obj):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return obj.members.filter(id=request.user.id).exists()
        return False
    
    def validate_name(self, value):
        if len(value) <= 4:
            raise serializers.ValidationError('Community name is too short')
        return value

    def validate_description(self, value):
        if len(value) <= 10:
            raise serializers.ValidationError('Community description is too short (min 10 letters)')
        return value

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['owner'] = request.user
        return Community.objects.create(**validated_data)


# upvote and downvote serializer create
class VoteSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = BlogPostVote
        fields = ['post', 'upvote', 'downvote']
        read_only_fields = ['post', 'upvote', 'downvote']

    def get_has_upvoted(self, obj):
        user = self.context['request'].user
        return obj.upvote.filter(id=user.id).exists()

    def get_has_downvoted(self, obj):
        user = self.context['request'].user
        return obj.downvote.filter(id=user.id).exists()

    def get_upvote_count(self, obj):
        return obj.upvote.count()

    def get_downvote_count(self, obj):
        return obj.downvote.count()

    def validate(self, data):
        user = self.context.get('user')
        slug = self.context.get('slug')

        try:

            post = BlogPost.objects.get(slug=slug)

        except BlogPost.DoesNotExist:
            raise serializers.ValidationError("Blog post not found.")
        
        vote_obj, _ = BlogPostVote.objects.get_or_create(post=post)
        
        if data.get("upvote") and data.get("downvote"):
            raise serializers.ValidationError("You can't upvote and downvote at the same time.")

        if data.get("upvote") and vote_obj.upvote.filter(id=user.id).exists():
            raise serializers.ValidationError('Blog post already up voted')
        
        if data.get("downvote") and vote_obj.downvote.filter(id=user.id).exists():
            raise serializers.ValidationError('Blog post already down voted')

        return data

    def create(self, validated_data):
        user = self.context['request'].user
        post = self.context['post']
        vote = BlogPostVote.objects.get_or_create(post=post)[0]

        if vote.upvote.filter(id=user.id).exists():
            # User already upvoted - remove upvote
            vote.upvote.remove(user)
        elif vote.downvote.filter(id=user.id).exists():
            # User downvoted before - remove downvote, add upvote
            vote.downvote.remove(user)
            vote.upvote.add(user)
        else:
            # First-time upvote
            vote.upvote.add(user)

        vote.save()
        return vote


# Blog post api serializer
class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    created_at = serializers.DateTimeField(format='%Y-%m-%dt%H:%M:%S')
    communities = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name',
        source='community'
    )
    comments_count = serializers.SerializerMethodField()
    total_votes = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'image', 'author', 'communities', 'created_at',
            'comments_count', 'total_votes'
        ]

    # getting the blogpost author returning none if not author
    def get_is_author(self, obj):
        request = self.context.get('request')
        return request.user if obj.author == request.user else None

    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_total_votes(self, obj):
        upvotes = obj.blog_vote.upvote.count() if hasattr(obj, 'blog_vote') else 0
        downvotes = obj.blog_vote.downvote.count() if hasattr(obj, 'blog_vote') else 0
        return upvotes + downvotes


# blog post create serializer
class BlogPostCreateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True, error_messages={
        'required': 'Title field is required',
        'blank': 'Title field cannot be empty'
    })
    content = serializers.CharField(required=True, error_messages={
        'required': 'Content field is required',
        'blank': 'Content field cannot be empty'
    })

    class Meta:
        model = BlogPost
        fields = ['author', 'community', 'title', 'content', 'image']
        read_only_fields = ['author', 'community']

    def validate_title(self, value):
        # validating the length of the title
        if len(value) <= 5:
            raise serializers.ValidationError('Title field is too short')
        return value
    
    def validate_content(self, value):
        # validate the length of content
        if len(value) <= 5:
            raise serializers.ValidationError('Content field is too short')
        return value

    # checks if the user is the member of the community
    def validate_community(self, value):
        user = self.context.get('author')

        if not user in value.members.filter(id=user.id).exits():
            raise serializers.ValidationError('You are not a member of this community.')
        return value

    # handling the user data validation
    def validate(self, attrs):
        author = self.context.get('author')

        # restrict how often a user can post to prevent spamming
        five_minute_ago = now() - timedelta(minutes=5)
        
        recent = BlogPost.objects.filter(
            author=author, created_at=five_minute_ago
        )

        if recent.exists():
            raise serializers.ValidationError(
                "You're posting too frequently. Please wait a for 5 more minute to post"
            )

        return attrs

    # handles the user posting the bog on create
    def create(self, validated_data):
        return BlogPost.objects.create(**validated_data)

