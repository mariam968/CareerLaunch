from django.contrib import admin
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'internship',
        'institution',
        'course',
        'status',
        'applied_at',
    )

    list_filter = (
        'status',
        'institution',
        'course',
    )

    search_fields = (
        'full_name',
        'email',
        'institution',
        'course',
        'internship__title',
    )