from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Internship
from .serializers import (
    InternshipSerializer,
    EmployerInternshipSerializer,
)


class InternshipListView(generics.ListAPIView):
    queryset = Internship.objects.all().order_by('-created_at')
    serializer_class = InternshipSerializer


class InternshipDetailView(generics.RetrieveAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer


class EmployerInternshipCreateView(generics.CreateAPIView):
    serializer_class = EmployerInternshipSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile = self.request.user.employer_profile

        if profile.verification_status != 'verified':
            raise PermissionDenied(
                'Your employer account must be verified before you can post internships.'
            )

        serializer.save(
            employer=self.request.user,
            company=profile.company_name
        )


class EmployerInternshipListView(generics.ListAPIView):
    serializer_class = EmployerInternshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Internship.objects.filter(
            employer=self.request.user
        ).order_by('-created_at')


class EmployerInternshipUpdateView(generics.UpdateAPIView):
    serializer_class = EmployerInternshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Internship.objects.filter(
            employer=self.request.user
        )


class EmployerInternshipDeleteView(generics.DestroyAPIView):
    serializer_class = EmployerInternshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Internship.objects.filter(
            employer=self.request.user
        )