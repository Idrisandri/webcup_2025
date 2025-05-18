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

    FORMAT_CHOICES = [
        ('classic',    'Classique'),
        ('fati',       'Fati'),
        ('canva',      'Canva'),
        ('immersive',  'Immersive'),
    ]

    title        = models.CharField(max_length=200)
    description  = models.TextField()
    image        = models.ImageField(upload_to='publication_images/', null=True, blank=True)
    video        = models.FileField(upload_to='videos/', null=True, blank=True)
    music        = models.FileField(upload_to='audios/', null=True, blank=True)
    tone         = models.CharField(max_length=2, choices=TONE_CHOICES, default='🙌')
    format       = models.CharField(max_length=10, choices=FORMAT_CHOICES, default='classic')

    author       = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at   = models.DateTimeField(auto_now_add=True)
    views        = models.PositiveIntegerField(default=0)
    reactions    = models.PositiveIntegerField(default=0)
    shares       = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title
