from rest_framework import serializers

from .models import Internship


class InternshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Internship

        fields = [
            'id',
            'title',
            'company',
            'location',
            'internship_type',
            'category',
            'description',
            'requirements',
            'responsibilities',
            'deadline',
            'created_at',
        ]


class EmployerInternshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Internship

        fields = [
            'id',
            'title',
            'company',
            'location',
            'internship_type',
            'category',
            'description',
            'requirements',
            'responsibilities',
            'deadline',
            'created_at',
        ]

        read_only_fields = [
            'id',
            'created_at',
        ]