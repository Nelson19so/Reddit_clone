from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.timezone import now

User = get_user_model()

# community model
class Community(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_communities')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='joined_communities')
    created = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        return super().save(*args, **kwargs)

# blog post category model
class BlogPostCategory(models.Model):
    CATEGORY = [
        ('TOP', 'top'),
        ('HOT', 'hot'),
        ('NEW', 'new'),
        ('RISING', 'rising'),
        ('CONTROVERSIAL', 'controversial'),
        ('GILDED', 'gilded'),
        ('PROMOTED', 'promoted'),
    ]

    category = models.CharField(max_length=50, blank=False, null=False, choices=CATEGORY)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.date_updated = now()
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.category

# blog post user model
class BlogPost(models.Model):
    community = models.ManyToManyField(Community, related_name='community_posts')
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts'
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            num = 1
            while BlogPost.objects.filter(slug=base_slug):
                self.slug = f'{base_slug}{num}'
                num += 1
            self.slug = base_slug
            
        return super().save(*args, **kwargs)

# Blog post vote model
class BlogPostVote(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_vote'
    )
    post = models.OneToOneField(BlogPost, on_delete=models.CASCADE, related_name='blog_vote')
    category = models.ForeignKey(
        BlogPostCategory, on_delete=models.PROTECT, 
        related_name='blog_category', null=True, blank=True
    )
    upvote = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='upvote_posts')
    downvote = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='downvote_posts')
    upvote_count = models.IntegerField()
    downvote_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post.title

    class Meta:
        unique_together = ('post', 'user')

    @property
    def blog_post_upvote_count(self):
        return self.upvote.all if self.upvote else None

    @property
    def blog_post_downvote_count(self):
        return self.downvote.all if self.downvote else None

# blog post comment model
class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author.username}'
