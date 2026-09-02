from django.contrib.auth.models import User
from rest_framework import serializers

from .models import StudentProfile


class StudentRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    full_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    institution = serializers.CharField(max_length=200)
    course = serializers.CharField(max_length=200)
    year_of_study = serializers.CharField(max_length=50)
    location = serializers.CharField(max_length=100)
    skills = serializers.CharField(
        required=False,
        allow_blank=True
    )

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                'This username is already taken.'
            )

        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                'An account with this email already exists.'
            )

        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        StudentProfile.objects.create(
            user=user,
            full_name=validated_data['full_name'],
            phone=validated_data['phone'],
            institution=validated_data['institution'],
            course=validated_data['course'],
            year_of_study=validated_data['year_of_study'],
            location=validated_data['location'],
            skills=validated_data.get('skills', ''),
        )

        return user


class StudentProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        source='user.email',
        required=False,
        allow_blank=True
    )

    class Meta:
        model = StudentProfile

        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'institution',
            'course',
            'year_of_study',
            'location',
            'skills',
            'cv',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'created_at',
            'updated_at',
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        email = user_data.get('email')

        if email is not None:
            instance.user.email = email
            instance.user.save(update_fields=['email'])

        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)

        instance.save()

        return instance