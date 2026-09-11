from django.contrib.auth.models import User
from rest_framework import serializers

from .models import EmployerProfile


class EmployerRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    company_name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=20)
    location = serializers.CharField(max_length=100)
    industry = serializers.CharField(max_length=100)
    description = serializers.CharField(
        required=False,
        allow_blank=True
    )
    website = serializers.URLField(
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

        EmployerProfile.objects.create(
            user=user,
            company_name=validated_data['company_name'],
            company_email=validated_data['email'],
            phone=validated_data['phone'],
            location=validated_data['location'],
            industry=validated_data['industry'],
            description=validated_data.get(
                'description',
                ''
            ),
            website=validated_data.get(
                'website'
            ) or None,
        )

        return {
            'username': user.username,
            'email': user.email,
            'company_name': validated_data['company_name'],
            'phone': validated_data['phone'],
            'location': validated_data['location'],
            'industry': validated_data['industry'],
            'description': validated_data.get(
                'description',
                ''
            ),
            'website': validated_data.get(
                'website'
            ) or '',
        }


class EmployerLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        write_only=True
    )


class EmployerProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        source='user.email',
        required=False,
        allow_blank=True
    )

    class Meta:
        model = EmployerProfile

        fields = [
            'id',
            'company_name',
            'email',
            'phone',
            'location',
            'industry',
            'description',
            'website',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'created_at',
            'updated_at',
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop(
            'user',
            {}
        )

        email = user_data.get('email')

        if email is not None:
            instance.user.email = email
            instance.user.save(
                update_fields=['email']
            )

            instance.company_email = email

        for attribute, value in validated_data.items():
            setattr(
                instance,
                attribute,
                value
            )

        instance.save()

        return instance