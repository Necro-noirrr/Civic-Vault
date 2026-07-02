from django.urls import path
from .views import TransferView, TransactionHistoryView, AdminTransactionView, AdminUserListView

urlpatterns = [
    path('transfer/', TransferView.as_view()),
    path('history/', TransactionHistoryView.as_view()),
    path('admin/all/', AdminTransactionView.as_view()),
    path('admin/users/', AdminUserListView.as_view()),
]