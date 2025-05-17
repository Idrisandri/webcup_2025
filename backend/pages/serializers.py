from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = '__all__'

    def get_timestamp(self, obj):
        from django.utils.timesince import timesince
        return f'il y a {timesince(obj.created_at)}'