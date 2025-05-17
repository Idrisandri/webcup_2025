# pages/views.py
from django.shortcuts import render  # (garde si tu utilises render ailleurs)
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from accounts.views import CsrfExemptSessionAuthentication  # même classe que pour logout

from .models import Publication
from .serializers import PublicationSerializer

# Pour servir le cookie csrftoken
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator


class PublicationViewSet(ModelViewSet):
    """
    CRUD complet sur les publications.

    ⚠️ authentication_classes désactive la vérification CSRF
    pour les requêtes venant du front (Axios + cookie).
    """
    queryset = Publication.objects.all().order_by('-created_at')
    serializer_class = PublicationSerializer

    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]  # Passe à IsAuthenticated si nécessaire

    def perform_create(self, serializer):
        """
        Associe automatiquement l’auteur à la publication,
        plutôt que d’attendre un champ 'author' dans le formData.
        """
        serializer.save(author=self.request.user)


# -----------------  utilitaire CSRF ----------------- #
@ensure_csrf_cookie
def get_csrf_token(request):
    """
    GET /api/pages/csrf/  → renvoie 200 + Set-Cookie: csrftoken=...
    Permet au front d’obtenir un cookie avant le premier POST.
    """
    return JsonResponse({'detail': 'CSRF cookie set'})
