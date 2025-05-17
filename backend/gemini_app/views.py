# gemini_app/views.py

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai

class GeminiAPIView(APIView):
    """
    POST /api/gemini/
    Body JSON:
      { "prompt": "Votre texte ici…" }
    Réponse JSON:
      200 → { "response": "Texte généré par Gemini" }
      400 → { "error": "Prompt manquant." }
      500 → { "error": "Détail de l’exception" }
    """
    authentication_classes = []  # Pas d'authentification requise
    permission_classes = []      # Ou [AllowAny]

    def post(self, request):
        prompt = request.data.get("prompt", "").strip()
        if not prompt:
            return Response(
                {"error": "Prompt manquant."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Initialisation de l'API Gemini
        genai.configure(api_key=settings.GEMINI_API_KEY)

        try:
            # Construction du modèle avec instructions système
            model = genai.GenerativeModel(
                "gemini-2.0-flash",
                system_instruction=[
                    "Tu es un assistant spécialisé dans une application appelée 'TheEnd.page'.", "Ton rôle exclusif est d’aider les utilisateurs à créer rapidement une page web personnalisée pour annoncer leur départ (d’un emploi, d’une équipe, d’un projet, ou d'une relation).", "Les pages créées doivent comporter :", "1. Un ton précis (par exemple : passif-agressif, honnête, ironique). Chaque ton a des couleurs et des styles spécifiques.", "2. Un texte bref rédigé par l'utilisateur, incluant éventuellement des emojis pour exprimer son émotion.", "3. L'intégration optionnelle d'un GIF (via l'API Giphy) représentant l'émotion du départ.", "4. Un son d'ambiance facultatif (drôle, triste, dramatique) pré-sélectionné.", "5. Une URL courte générée automatiquement via Bitly.", "6. Des boutons de partage rapide sur WhatsApp, Facebook et Twitter.", "7. Un compteur de visites discret pour indiquer la popularité de la page.", "Réponds uniquement aux demandes liées à ces fonctionnalités, refuse clairement toute autre requête hors-sujet.", "Tes réponses doivent être courtes, pratiques, immédiatement applicables pour aider l’utilisateur à créer rapidement sa page personnalisée sur TheEnd.page."
                ]
            )

            # Génération
            resp = model.generate_content(
                prompt,
                generation_config={
                    "temperature": 0.3,
                    "top_p": 0.9,
                }
            )

            return Response(
                {"response": resp.text},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": f"Erreur API Gemini : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
