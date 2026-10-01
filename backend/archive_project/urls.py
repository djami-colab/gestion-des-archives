from django.contrib import admin
from django.urls import path
from archive import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/boxes/", views.box_list),
]
