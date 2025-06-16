from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import BlogPost, BlogPostCategory, BlogPostVote
from django.utils.timezone import now, timedelta

@receiver(pre_save, sender=BlogPostVote)
def hot_blog_post(sender, instance, **kwargs):
    # checks if changes are made
    if not instance.pk:
        return
    
    post = instance.pk
    upvote_count = instance.upvote.count()
    time_since_creation = now() - post.created_at
    
    if upvote_count >= 500 and time_since_creation <= timedelta(days=1):
        category_value = 'HOT'
    elif upvote_count >= 15:
        category_value = 'TOP'
    else:
        category_value = 'NEW'  # default/fallback
    
    category_obj, created = BlogPostCategory.objects.get_or_create(category=category_value)
    post.category = category_obj
    post.save()
        
    
    