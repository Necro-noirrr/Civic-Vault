from rest_framework import serializers
from .models import CustomUser, BankAccount
import random

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone', 'password']

    def create(self, validated_data):
        # creates user with hashed password
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone=validated_data.get('phone', ''),
            password=validated_data['password']
        )
        # auto create bank account when user registers
        BankAccount.objects.create(
            user=user,
            account_number=str(random.randint(1000000000, 9999999999))
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone']

class BankAccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = BankAccount
        fields = ['user', 'account_number', 'balance', 'is_frozen']