# 🧠 Reddit Clone - Django REST API + React Frontend

A full-stack Reddit-style blog post system using **Django REST Framework** as the backend API and **React.js** for the frontend. Supports JWT authentication, Google login via Allauth, and robust user registration with email or username.

---

## 📁 Project Structure

    |   +---public
    |   |       vite.svg
    |   |
    |   \---src
    |       |   App.jsx
    |       |   main.jsx
    |       |
    |       \---assets
    |           |   react.svg
    |           |
    |           \---css
    |                   main.css
    |
    \---server
        |   .env
        |   db.sqlite3
        |   manage.py
        |   requirements.txt
        |
        +---apps
        |   \---accounts
        |       |   admin.py
        |       |   apps.py
        |       |   backend.py
        |       |   models.py
        |       |   serializer.py
        |       |   tests.py
        |       |   urls.py
        |       |   views.py
        |       |   __init__.py
        |
        \---server
            |   asgi.py
            |   db.sqlite3
            |   urls.py
            |   wsgi.py
            |   __init__.py
            |
            +---settings
            |   |   base.py
            |   |   dev.py
            |   |   prod.py
            |   |
            |   \---__pycache__
            |           base.cpython-313.pyc
            |           dev.cpython-313.pyc
            |           settings.cpython-313.pyc
            |
            \---__pycache__
                    settings.cpython-313.pyc
                    urls.cpython-313.pyc
                    wsgi.cpython-313.pyc
                    __init__.cpython-313.pyc


---

## 🛠️ Features

- Custom user model with username, email, password, bio, avatar.
- Email or username login support.
- JWT authentication via `djangorestframework-simplejwt`.
- Google login via Django Allauth + REST endpoints.
- Full CRUD for posts and comments (React UI).
- Token-based secure API endpoints.

---

## setting up the Project (Front-end & Backend + google allAuth setup)

```bash
⚙️ Backend Setup (Django + DRF)

1. Clone the repository

git clone https://github.com/your-username/reddit-clone.git
cd reddit-clone/server

2. Create a virtual environment

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

3. Install dependencies

pip install -r requirements.txt

4. Set up .env file

Create a .env file in server/ directory:

SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=your_db
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

5. Run migrations

python manage.py makemigrations
python manage.py migrate

6. Create superuser (admin)

python manage.py createsuperuser

7. Start backend server

python manage.py runserver


---

🌐 Frontend Setup (React)

1. Navigate to frontend folder

cd ../client

2. Install frontend dependencies

npm install

3. Create a .env file for React

REACT_APP_BACKEND_URL=http://127.0.0.1:8000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

4. Start React frontend

npm start


---

🔐 Google Login Setup (with Allauth)

1. Go to Google Cloud Console

Create a new project or use existing.

Navigate to APIs & Services > Credentials

Click + Create Credentials > OAuth Client ID

Choose Web application

Add redirect URI:

http://localhost:8000/accounts/google/login/callback/

Add authorized JS origins:

http://localhost:3000

Save your Client ID and Client Secret and paste into .env


2. Update Django settings

# Installed apps
INSTALLED_APPS = [
    ...
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    ...
]

# Add in settings.py
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'

# Google Provider
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
    }
}


---

🔗 API Endpoints

Method	Endpoint	Description

POST	/api/register/	Register new user
POST	/api/login/	Login with JWT
POST	/api/token/refresh/	Refresh access token
GET	/api/posts/	List all posts
POST	/api/posts/	Create a new post
GET	/api/profile/me/	Get current user data



---

🔍 Testing

Run Django tests:

python manage.py test


---

✅ Deployment Notes

Use Gunicorn + Nginx for production backend

Use .env.production in React

Secure keys with environment variables

Configure CORS and CSRF properly



---

🤝 Contributing

Pull requests and contributions are welcome. Please open an issue first to discuss what you’d like to change.


---

📜 License

MIT License. See LICENSE.md file for details.

---

✅ **Now you can:**
1. Copy this entire content into your GitHub repo's `README.md`.
2. Replace placeholders like `your_django_secret_key`, `your_google_client_id`, and GitHub repo link.
3. Adjust anything project-specific like routes or API if needed.

Let me know if you'd like a Markdown file version you can directly download.

```

---

## 💻 Tech Stack

- **Backend**: Django, Django REST Framework, PostgreSQL, Simple JWT, Allauth
- **Frontend**: React.js, Fetch API
- **Authentication**: Custom JWT, Google OAuth2 via Allauth
- **Deployment Ready**: Gunicorn, Nginx, .env based config

---

## 📸 Preview

![App Screenshot](link-to-screenshot.png)
