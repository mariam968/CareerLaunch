from django.contrib.auth import authenticate

from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EmployerProfile

from .serializers import (
    EmployerRegistrationSerializer,
    EmployerLoginSerializer,
    EmployerProfileSerializer,
)


class EmployerRegistrationView(generics.CreateAPIView):
    serializer_class = EmployerRegistrationSerializer


class EmployerLoginView(APIView):
    def post(self, request):
        serializer = EmployerLoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        username = serializer.validated_data[
            'username'
        ]

        password = serializer.validated_data[
            'password'
        ]

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {
                    'detail':
                    'Invalid username or password.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({
            'token': token.key,
            'username': user.username,
        })


class EmployerProfileView(
    generics.RetrieveUpdateAPIView
):
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, created = (
            EmployerProfile.objects.get_or_create(
                user=self.request.user,
                defaults={
                    'company_name':
                        self.request.user.username,
                    'company_email':
                        self.request.user.email,
                    'phone': '',
                    'location': '',
                    'industry': '',
                    'description': '',
                    'website': None,
                }
            )
        )

        return profile