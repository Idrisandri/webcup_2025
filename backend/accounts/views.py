from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from .serializers import SignupStep1Serializer, SignupStep2Serializer, LoginSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from django.contrib.auth import logout

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
    """
    Hérite de SessionAuthentication mais désactive la vérification CSRF.
    """
    def enforce_csrf(self, request):
        return  # skip CSRF check

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
    


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response(status=204)