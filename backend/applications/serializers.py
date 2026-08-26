from rest_framework import serializers

from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    internship_title = serializers.CharField(
        source='internship.title',
        read_only=True
    )

    company = serializers.CharField(
        source='internship.company',
        read_only=True
    )

    class Meta:
        model = Application

        fields = [
            'id',
            'student',
            'internship',
            'internship_title',
            'company',
            'full_name',
            'email',
            'phone',
            'institution',
            'course',
            'year_of_study',
            'cover_letter',
            'cv',
            'status',
            'applied_at',
        ]

        read_only_fields = [
            'id',
            'student',
            'internship_title',
            'company',
            'status',
            'applied_at',
        ]