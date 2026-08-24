from rest_framework import generics

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationListView(generics.ListAPIView):
    queryset = Application.objects.all().order_by('-applied_at')
    serializer_class = ApplicationSerializer