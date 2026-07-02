from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db import transaction
from accounts.models import BankAccount
from .models import Transaction
from .serializers import TransactionSerializer
from decimal import Decimal


# Create your views here.

class TransferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        sender = BankAccount.objects.get(user=request.user)
        amount = Decimal(request.data.get('amount', 0))
        note = request.data.get('note', '')

        if sender.is_frozen:
            return Response({'error': 'Your account is frozen'}, status=403)
        if amount <= 0:
            return Response({'error': 'Invalid amount'}, status=400)
        if sender.balance < amount:
            return Response({'error': 'Insufficient balance'}, status=400)

        try:
            receiver = BankAccount.objects.get(
                account_number=request.data.get('receiver_account_number')
            )
        except BankAccount.DoesNotExist:
            return Response({'error': 'Receiver not found'}, status=404)

        if receiver.is_frozen:
            return Response({'error': 'Receiver account is frozen'}, status=403)

        with transaction.atomic():
            sender.balance -= amount
            receiver.balance += amount
            sender.save()
            receiver.save()
            Transaction.objects.create(
                sender=sender,
                receiver=receiver,
                amount=amount,
                note=note
            )

        return Response({'message': 'Transfer successful'})


class TransactionHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = BankAccount.objects.get(user=request.user)
        transactions = Transaction.objects.filter(
            sender=account
        ) | Transaction.objects.filter(
            receiver=account
        )
        serializer = TransactionSerializer(
            transactions.order_by('-timestamp'), many=True
        )
        return Response(serializer.data)


class AdminTransactionView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        all_tx = Transaction.objects.all().order_by('-timestamp')
        serializer = TransactionSerializer(all_tx, many=True)
        return Response(serializer.data)


class AdminUserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        accounts = BankAccount.objects.all()
        from accounts.serializers import BankAccountSerializer
        serializer = BankAccountSerializer(accounts, many=True)
        return Response(serializer.data)