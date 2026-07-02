from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import BankAccount
from .serializers import RegisterSerializer, BankAccountSerializer

# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registered successfully'}, status=201)
        return Response(serializer.errors, status=400)
    
class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password')
        )
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        return Response({'error': 'Wrong credentials'}, status=401)
    
class AccountDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = BankAccount.objects.get(user=request.user)
        serializer = BankAccountSerializer(account)
        return Response(serializer.data)
    
class FreezeAccountView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, account_number):
        try:
            account = BankAccount.objects.get(account_number=account_number)
            account.is_frozen = not account.is_frozen
            account.save()
            return Response({'message': 'Done'})
        except BankAccount.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)