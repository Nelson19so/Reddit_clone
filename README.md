# 🔥 Reddit Clone – Backend API

This is the backend API for a Reddit-like platform built with **Django REST Framework**, integrated with **React** as the frontend.

---

## ⚙️ Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | React + Axios + Tailwind CSS + scss |
| Backend       | Django + DRF + JWT (Custom)         |
| OAuth         | Django AllAuth (Google Login)       |
| Image Support | Pillow                              |
| Database      | PostgreSQL                          |

---

## 🚀 Features

### 🔐 Authentication

- Register with email and password (username auto-generated from email)
- Login with email or username + password
- Google login via OAuth2
- OTP support (for future)
- Logout & account deletion
- JWT token-based auth

### 🧑 Profile

- One-to-One profile model: bio, avatar
- View/update profile
- Password reset/change

### 📚 Reddit Clone Features (CRUD)

- Create/read posts
- Comments (nested)
- Voting system
- Communities (subreddits)
- Join/leave community
- User profile view

---

## 📦 Setup Instructions

### 🔽 Backend Setup

1. **Clone the project:**

```bash
git clone https://github.com/your-username/reddit-clone-backend.git
cd reddit-clone-backend

2. Set up environment:



python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

3. Install requirements:



pip install -r requirements.txt

4. Configure .env file:



SECRET_KEY=your_django_secret
DEBUG=True

DATABASE_URL=your_postgres_url

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

ALLOWED_HOSTS=127.0.0.1,localhost

5. Apply migrations:



python manage.py makemigrations
python manage.py migrate

6. Create superuser:



python manage.py createsuperuser

7. Start server:



python manage.py runserver


---

🔽 Frontend Setup (React)

1. Navigate to frontend project:



cd reddit-clone-frontend

2. Install dependencies:



npm install

3. Start React app:



npm start

4. Axios config example:



import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


---

🔑 Google OAuth Setup

1. Go to Google Cloud Console


2. Create a new project → OAuth consent screen


3. Add credentials: OAuth Client ID


4. Add redirect URIs:



http://localhost:8000/accounts/google/login/callback/
http://localhost:3000  # if using React dev server

5. Update .env:



GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...


---

🔌 API Endpoints

Endpoint	Method	Description

/api/register/	POST	Register a new user
/api/login/	POST	Login user
/api/logout/	POST	Logout user
/api/delete-account/	DELETE	Delete user
/api/profile/	GET	View user profile
/api/profile/update/	PUT	Update profile
/api/posts/	GET/POST	Post list or create
/api/posts/:slug/	GET	Retrieve post
/api/comments/:slug/	POST	Add comment to post
/api/communities/	GET/POST	Community list/create
/api/token/verify/	POST	Verify JWT token



---

🧑‍💻 Author

Name: Nelson

Role: Backend Developer

GitHub: github.com/Nelson19so

LinkedIn: https://www.linkedin.com/in/nelson-junior-700b67363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
```
