from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    date_of_birth = models.DateField(null=True, blank=True)
    EMOTION_CHOICES = [
        ('joie', 'Joie'),
        ('colere', 'Colère'),
        ('regret', 'Regret'),
        ('tristesse', 'Tristesse'),
        ('peur', 'Peur'),
    ]
    emotion = models.CharField(max_length=10, choices=EMOTION_CHOICES, null=True, blank=True)