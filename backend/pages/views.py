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


class PublicationViewSet(ModelViewSet):
    """
    CRUD complet sur les publications.
    - Auth facultative (AllowAny) : un utilisateur anonyme peut poster
      → l’auteur restera NULL sauf si author_id est envoyé.
    """
    queryset = Publication.objects.all().order_by("-created_at")
    serializer_class = PublicationSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]

    # ---------- création ----------
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            self.perform_create(serializer)
        except Exception:
            print("=== ERREUR perform_create ===")
            import traceback; traceback.print_exc()
            # on relaisse l’exception pour que DRF retourne 500
            raise

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        """
        Associe automatiquement l’auteur connecté,
        à moins qu’un `author_id` ait été fourni.
        """
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            # soit author_id a été validé par le serializer, soit auteur = NULL
            serializer.save()


# ----------- utilitaire pour poser le cookie CSRF -----------
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})
