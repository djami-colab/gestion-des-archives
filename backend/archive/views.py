from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import ArchiveBox

@login_required

def box_list(request):
    boxes = ArchiveBox.objects.select_related("service", "location").order_by("-created_at")
    return JsonResponse({"results": [{"code": box.code, "title": box.title, "service": box.service.label_fr, "status": box.get_status_display(), "location": str(box.location) if box.location else None} for box in boxes]})
