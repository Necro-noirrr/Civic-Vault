# 🏦 Civic Vault - Banking Management System

A full stack banking web application built with Django REST Framework and React JS.

## 🚀 Features

- JWT Authentication (Login / Register)
- Account Dashboard with balance overview
- Fund Transfers with atomic transaction safety
- Transaction History
- Admin Panel — freeze/unfreeze user accounts
- Role-based access control (Admin vs User)

## 🛠️ Tech Stack

**Backend:** Python, Django, Django REST Framework, SimpleJWT, SQLite  
**Frontend:** React JS, Axios, Bootstrap 5, React Router DOM

## 📁 Project Structure

banking_project/
├── banking_backend/     # Django REST API
│   ├── accounts/        # User auth + bank accounts
│   └── transactions/    # Fund transfers + history
└── banking_frontend/    # React JS frontend
└── src/
├── pages/       # Login, Register, Dashboard, Transfer, Transactions, Admin
├── components/  # Navbar
└── api/         # Axios instance

## ⚙️ Setup Instructions

### Backend
```bash
cd banking_backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd banking_frontend
npm install
npm run dev
```

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/register/` | Register new user |
| POST | `/api/accounts/login/` | Login + get JWT token |
| GET | `/api/accounts/account/me/` | Get account details |
| POST | `/api/transactions/transfer/` | Fund transfer |
| GET | `/api/transactions/history/` | Transaction history |
| GET | `/api/transactions/admin/users/` | All users (admin only) |

## 👨‍💻 Developer

Built by **Amal** as a portfolio project.
