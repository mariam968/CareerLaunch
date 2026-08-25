from rest_framework import generics

from .serializers import StudentRegistrationSerializer


class StudentRegistrationView(generics.CreateAPIView):
    serializer_class = StudentRegistrationSerializer