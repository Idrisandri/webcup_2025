# pages/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Publication

User = get_user_model()


class PublicationSerializer(serializers.ModelSerializer):
    # Lecture seule : on renvoie le nom/Pseudo de l’auteur
    author = serializers.StringRelatedField(read_only=True)

    # Écriture seule : permet à un admin de poster “au nom de…”
    author_id = serializers.PrimaryKeyRelatedField(
        source="author",
        queryset=User.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )

    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = [
            "id",
            "title",
            "description",
            "image",
            "video",
            "music",
            "tone",
            "format",
            "created_at",
            "views",
            "reactions",
            "shares",
            "author",      # string read-only
            "author_id",   # PK write-only
            "timestamp",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "views",
            "reactions",
            "shares",
            "author",
            "timestamp",
        ]

    # joli “il y a 3 min”
    def get_timestamp(self, obj):
        from django.utils.timesince import timesince
        return f"il y a {timesince(obj.created_at)}"
