
from django.contrib.auth import authenticate

from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

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

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {
                    "detail": "Invalid username or password."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Require an existing employer profile.
        if not EmployerProfile.objects.filter(
            user=user
        ).exists():
            return Response(
                {
                    "detail": (
                        "This account is not registered as an employer. "
                        "Please use the student portal or create an "
                        "employer account."
                    )
                },
                status=status.HTTP_403_FORBIDDEN
            )

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({
            "token": token.key,
            "username": user.username,
        })


class EmployerProfileView(
    generics.RetrieveUpdateAPIView
):
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return EmployerProfile.objects.get(
                user=self.request.user
            )
        except EmployerProfile.DoesNotExist:
            raise PermissionDenied(
                "This account does not have an employer profile."
            )
