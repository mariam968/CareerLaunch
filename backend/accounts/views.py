from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import StudentProfile, Notification
from .serializers import (
    StudentRegistrationSerializer,
    StudentProfileSerializer,
)


class StudentRegistrationView(generics.CreateAPIView):
    serializer_class = StudentRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        registration_data = serializer.save()

        user = User.objects.get(
            username=registration_data['username']
        )

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response(
            {
                'token': token.key,
                'username': user.username,
                'email': user.email,
                'full_name': registration_data['full_name'],
            },
            status=status.HTTP_201_CREATED
        )


class StudentLoginView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {
                    'detail': 'Invalid username or password.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response(
            {
                'token': token.key,
                'username': user.username,
            }
        )


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not current_password or not new_password:
            return Response(
                {
                    'detail': 'Current password and new password are required.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not request.user.check_password(current_password):
            return Response(
                {
                    'detail': 'Current password is incorrect.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(new_password) < 8:
            return Response(
                {
                    'detail': 'New password must be at least 8 characters long.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        request.user.set_password(new_password)
        request.user.save()

        return Response(
            {
                'detail': 'Password changed successfully.'
            },
            status=status.HTTP_200_OK
        )


class NotificationListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(
            user=request.user
        ).order_by('-created_at')

        return Response([
            {
                'id': notification.id,
                'title': notification.title,
                'message': notification.message,
                'notification_type': notification.notification_type,
                'is_read': notification.is_read,
                'created_at': notification.created_at,
            }
            for notification in notifications
        ])


class NotificationReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, notification_id):
        try:
            notification = Notification.objects.get(
                id=notification_id,
                user=request.user
            )
        except Notification.DoesNotExist:
            return Response(
                {'detail': 'Notification not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        notification.is_read = True
        notification.save()

        return Response(
            {'detail': 'Notification marked as read.'},
            status=status.HTTP_200_OK
        )


class StudentProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get_object(self):
        profile, created = StudentProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                'full_name': (
                    self.request.user.get_full_name()
                    or self.request.user.username
                ),
                'phone': '',
                'institution': '',
                'course': '',
                'year_of_study': '',
                'location': '',
                'skills': '',
            }
        )

        return profile

    def update(self, request, *args, **kwargs):
        print("\n==============================")
        print("PROFILE UPDATE REQUEST")
        print("==============================")

        print("Content-Type:", request.content_type)

        print("Data received:")
        print(request.data)

        print("\nFiles received:")
        print(request.FILES)

        if 'cv' in request.FILES:
            uploaded_cv = request.FILES['cv']

            print("\nCV FOUND")
            print("Filename:", uploaded_cv.name)
            print("Size:", uploaded_cv.size)
            print("Content type:", uploaded_cv.content_type)

        else:
            print("\nNO CV FILE RECEIVED")

        print("==============================\n")

        return super().update(request, *args, **kwargs)