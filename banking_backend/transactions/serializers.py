from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    sender_account = serializers.CharField(source='sender.account_number', read_only=True)
    receiver_account = serializers.CharField(source='receiver.account_number', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'sender_account', 'receiver_account', 'amount', 'note', 'timestamp']