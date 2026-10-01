from django.contrib import admin
from django.urls import path
from archive import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/login/", views.auth_login),
    path("api/auth/logout/", views.auth_logout),
    path("api/auth/me/", views.auth_me),
    path("api/boxes/", views.box_list),
]
