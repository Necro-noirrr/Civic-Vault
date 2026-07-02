from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# CustomUser
class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)

# BankAccount 
class BankAccount(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=10, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_frozen = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.account_number}"