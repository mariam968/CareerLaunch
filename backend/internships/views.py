from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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
        serializer.save(
            employer=self.request.user
        )