from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class SignupStep1Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'date_of_birth']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            date_of_birth=validated_data['date_of_birth'],
            is_active=False
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class SignupStep2Serializer(serializers.Serializer):
    emotion = serializers.ChoiceField(choices=User.EMOTION_CHOICES)

    def update(self, user, validated_data):
        user.emotion = validated_data['emotion']
        user.is_active = True
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)