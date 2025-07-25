# Generated by Django 5.2.2 on 2025-06-16 12:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0003_blogpostvote_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPostCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(default=[('TOP', 'top'), ('HOT', 'hot'), ('NEW', 'new'), ('RISING', 'rising'), ('CONTROVERSIAL', 'controversial'), ('GILDED', 'gilded'), ('PROMOTED', 'promoted')], max_length=50)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='blogpostvote',
            unique_together={('post', 'user')},
        ),
        migrations.AddField(
            model_name='blogpost',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='blog_category', to='community.blogpostcategory'),
        ),
    ]
