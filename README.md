# ProManage – Full Stack Project Management App

ProManage is a full-stack project & task management application built using
**React, Django REST Framework, Redis, Celery, and MongoDB**.

## 🚀 Tech Stack

### Frontend
- React
- Axios
- React Router
- JWT Authentication

### Backend
- Django + DRF
- SQLite (dev)
- JWT Auth
- Redis + Celery (async tasks)
- MongoDB (activity logs)

## ✨ Features
- User authentication (JWT)
- Project & task management
- Task status updates
- Protected routes
- Async activity logging
- Role-ready architecture

## 🛠 Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend
```bash
cd frontend
npm install
npm start
