import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import ArchiveBox


def _role_for_user(user):
    if user.is_superuser or user.groups.filter(name="Responsable d'archive").exists():
        return "archive_manager"
    if user.groups.filter(name="Archiviste").exists():
        return "archivist"
    if user.groups.filter(name="Consultant").exists():
        return "consultant"
    return "archivist"


@require_http_methods(["POST"])
def auth_login(request):
    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Requête invalide."}, status=400)

    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", ""))
    user = authenticate(request, username=username, password=password)
    if user is None or not user.is_active:
        return JsonResponse({"error": "Identifiants invalides."}, status=401)

    login(request, user)
    return JsonResponse({"user": {"id": user.id, "name": user.get_full_name() or user.username, "role": _role_for_user(user)}})


@require_http_methods(["POST"])
def auth_logout(request):
    logout(request)
    return JsonResponse({"ok": True})


@require_http_methods(["GET"])
def auth_me(request):
    if not request.user.is_authenticated:
        return JsonResponse({"user": None}, status=401)
    return JsonResponse({"user": {"id": request.user.id, "name": request.user.get_full_name() or request.user.username, "role": _role_for_user(request.user)}})


@login_required
def box_list(request):
    boxes = ArchiveBox.objects.select_related("service", "location").order_by("-created_at")
    return JsonResponse({"results": [{"code": box.code, "title": box.title, "service": box.service.label_fr, "status": box.get_status_display(), "location": str(box.location) if box.location else None} for box in boxes]})
