from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "change-me-in-intranet")
DEBUG = os.environ.get("DJANGO_DEBUG", "0") == "1"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
INSTALLED_APPS = ["django.contrib.admin", "django.contrib.auth", "django.contrib.contenttypes", "django.contrib.sessions", "django.contrib.messages", "django.contrib.staticfiles", "corsheaders", "archive"]
MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware", "django.middleware.security.SecurityMiddleware", "django.contrib.sessions.middleware.SessionMiddleware", "django.middleware.locale.LocaleMiddleware", "django.middleware.common.CommonMiddleware", "django.middleware.csrf.CsrfViewMiddleware", "django.contrib.auth.middleware.AuthenticationMiddleware", "django.contrib.messages.middleware.MessageMiddleware"]
ROOT_URLCONF = "archive_project.urls"
TEMPLATES = [{"BACKEND": "django.template.backends.django.DjangoTemplates", "DIRS": [], "APP_DIRS": True, "OPTIONS": {"context_processors": ["django.template.context_processors.request", "django.contrib.auth.context_processors.auth", "django.contrib.messages.context_processors.messages"]}}]
WSGI_APPLICATION = "archive_project.wsgi.application"
DATABASES = {"default": {"ENGINE": "django.db.backends.mysql", "NAME": os.environ.get("MYSQL_DATABASE", "archivia"), "USER": os.environ.get("MYSQL_USER", "archivia"), "PASSWORD": os.environ.get("MYSQL_PASSWORD", "TonMotDePasse"), "HOST": os.environ.get("MYSQL_HOST", "127.0.0.1"), "PORT": os.environ.get("MYSQL_PORT", "3307"), "OPTIONS": {"charset": "utf8mb4"}}}
LANGUAGE_CODE = "fr"
LANGUAGES = [("fr", "Français"), ("ar", "العربية")]
TIME_ZONE = "Africa/Algiers"
USE_I18N = True
USE_TZ = True
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost:3000").split(",")
