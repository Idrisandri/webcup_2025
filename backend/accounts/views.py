from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from .serializers import SignupStep1Serializer, SignupStep2Serializer, LoginSerializer
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.decorators import (
    authentication_classes,
    permission_classes
)
from django.contrib.auth import logout
from django.views.decorators.http import require_POST
from django.http import JsonResponse


User = get_user_model()

class SignupStep1View(APIView):
    def post(self, request):
        serializer = SignupStep1Serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignupStep2View(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id, is_active=False)
        except User.DoesNotExist:
            return Response({'error': 'Utilisateur invalide ou déjà activé'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SignupStep2Serializer(data=request.data)
        if serializer.is_valid():
            serializer.update(user, serializer.validated_data)
            return Response({'message': 'Inscription terminée'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """Session auth sans vérif CSRF"""
    def enforce_csrf(self, request):
        return  # pas de check CSRF

@csrf_exempt
@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([AllowAny])
def logout_view(request):
    """
    POST /api/accounts/logout/
    => Supprime la session sans CSRF ni permissions
    """
    logout(request)
    return Response(status=204)

class LoginView(APIView):
    """
    POST /api/accounts/login/
    {
      "email": "...",
      "password": "..."
    }
    Répond 200 + { emotion } ou 401 si mauvais identifiants.
    """
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # Lookup user by email
        try:
            user_obj = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate using real username
        user = authenticate(request, username=user_obj.username, password=password)
        if user is None:
            return Response({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)

        # Log the user in
        login(request, user)
        return Response({'emotion': user.emotion}, status=status.HTTP_200_OK)
    


@csrf_exempt
@require_POST
def logout_view(request):
    """
    POST /api/accounts/logout/
    Désactive CSRF et ne passe pas par DRF pour contourner le 403.
    """
    logout(request)
    return JsonResponse({}, status=204)