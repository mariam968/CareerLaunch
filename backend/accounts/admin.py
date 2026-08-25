from django.contrib import admin

from .models import StudentProfile


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'user',
        'institution',
        'course',
        'year_of_study',
        'location',
    )

    search_fields = (
        'full_name',
        'user__username',
        'user__email',
        'institution',
        'course',
    )

    list_filter = (
        'institution',
        'course',
        'year_of_study',
        'location',
    )