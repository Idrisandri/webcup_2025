# pages/views.py
from django.http import JsonResponse
from django.shortcuts import render  # utile si tu as d’autres vues avec render
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.views import CsrfExemptSessionAuthentication
from django.contrib.auth import get_user_model

from .models import Publication
from .serializers import PublicationSerializer

User = get_user_model()

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.views import CsrfExemptSessionAuthentication
from django.contrib.auth import get_user_model

from .models import Publication
from .serializers import PublicationSerializer

User = get_user_model()


class PublicationViewSet(ModelViewSet):
    """
    CRUD complet sur les publications.
    - Auth facultative (AllowAny) : un utilisateur anonyme peut poster.
    - Permet aussi de PATCH pour augmenter vues / réactions.
    """
    queryset = Publication.objects.all().order_by("-created_at")
    serializer_class = PublicationSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            self.perform_create(serializer)
        except Exception:
            print("=== ERREUR perform_create ===")
            import traceback; traceback.print_exc()
            raise

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            serializer.save()

    # GET /pages/publications/<id>/
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # PATCH /pages/publications/<id>/  → pour vues ou réactions
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        # Mise à jour partielle des champs : vues, réactions, etc.
        for field in ['views', 'reactions', 'shares']:
            if field in data:
                setattr(instance, field, data[field])

        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



# ----------- utilitaire pour poser le cookie CSRF -----------
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})
