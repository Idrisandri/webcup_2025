from django.db import models

# Create your models here.
# pages/models.py
from django.db import models
from accounts.models import User

class Publication(models.Model):
    TONE_CHOICES = [
        ('😒', 'Passif-agressif'),
        ('🙌', 'Honnête'),
        ('😂', 'Ironique'),
        ('😢', 'Touchant'),
        ('✨', 'Classe'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='publication_images/', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    reactions = models.PositiveIntegerField(default=0)
    shares = models.PositiveIntegerField(default=0)
    tone = models.CharField(max_length=2, choices=TONE_CHOICES, default='🙌')
    video        = models.FileField(upload_to='videos/', null=True, blank=True)  # ← NEW
    music        = models.FileField(upload_to='audios/', null=True, blank=True)  # ← NEW

    def __str__(self):
        return self.title
