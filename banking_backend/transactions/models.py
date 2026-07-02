from django.db import models
from accounts.models import BankAccount
# Create your models here.

class Transaction(models.Model):
    sender = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='sent')
    receiver = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='received')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.user.username} → {self.receiver.user.username} | {self.amount}"