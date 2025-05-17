from django.urls import path
from .views import GeminiAPIView

app_name = 'gemini_app'

urlpatterns = [
    # Une seule URL pour la page Gemini
    path('', GeminiAPIView.as_view(), name='gemini_api'),
]