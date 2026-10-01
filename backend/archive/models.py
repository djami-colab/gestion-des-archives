from django.db import models

class Service(models.Model):
    code = models.CharField(max_length=30, unique=True)
    label_fr = models.CharField(max_length=150)
    label_ar = models.CharField(max_length=150, blank=True)
    active = models.BooleanField(default=True)

class Location(models.Model):
    room = models.CharField(max_length=80)
    aisle = models.CharField(max_length=80)
    shelf = models.CharField(max_length=80)
    active = models.BooleanField(default=True)

class ArchiveBox(models.Model):
    STATUS_CHOICES = [("registered", "Enregistrée"), ("archived", "Archivée"), ("out", "Sortie"), ("returned", "Restituée"), ("transferred", "Transférée"), ("destroyed", "Détruite"), ("transferred_final", "Versée")]
    code = models.CharField(max_length=40, unique=True)
    title = models.CharField(max_length=255)
    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name="boxes")
    location = models.ForeignKey(Location, null=True, blank=True, on_delete=models.PROTECT)
    period_start = models.PositiveSmallIntegerField()
    period_end = models.PositiveSmallIntegerField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="registered")
    retention_until = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BoxItem(models.Model):
    box = models.ForeignKey(ArchiveBox, on_delete=models.CASCADE, related_name="items")
    label = models.CharField(max_length=255)
    reference = models.CharField(max_length=120, blank=True)

class Movement(models.Model):
    box = models.ForeignKey(ArchiveBox, on_delete=models.PROTECT, related_name="movements")
    movement_type = models.CharField(max_length=40)
    from_location = models.ForeignKey(Location, null=True, blank=True, related_name="departures", on_delete=models.PROTECT)
    to_location = models.ForeignKey(Location, null=True, blank=True, related_name="arrivals", on_delete=models.PROTECT)
    reason = models.TextField(blank=True)
    created_by = models.ForeignKey("auth.User", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
