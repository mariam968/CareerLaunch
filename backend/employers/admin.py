from django.contrib import admin
from .models import EmployerProfile


@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = (
        'company_name',
        'company_email',
        'phone',
        'verification_status',
        'verified_at',
        'created_at',
    )

    list_filter = (
        'verification_status',
        'created_at',
    )

    search_fields = (
        'company_name',
        'company_email',
        'phone',
    )

    readonly_fields = (
        'created_at',
        'updated_at',
        'verified_at',
    )