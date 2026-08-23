from django.contrib import admin
from .models import Internship


@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'company',
        'location',
        'internship_type',
        'category',
        'deadline',
    )

    list_filter = (
        'internship_type',
        'category',
        'location',
    )

    search_fields = (
        'title',
        'company',
        'category',
    )