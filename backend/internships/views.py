from rest_framework import generics

from .models import Internship
from .serializers import InternshipSerializer


class InternshipListView(generics.ListAPIView):
    queryset = Internship.objects.all().order_by('-created_at')
    serializer_class = InternshipSerializer



class InternshipDetailView(generics.RetrieveAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer