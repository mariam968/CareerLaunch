from django.db.models import Count
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Application
from .serializers import (
    ApplicationSerializer,
    EmployerApplicationSerializer,
)
from internships.models import Internship


class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        use_saved_cv = (
            str(request.data.get('use_saved_cv', '')).lower()
            == 'true'
        )

        if use_saved_cv:
            profile = getattr(
                request.user,
                'student_profile',
                None
            )

            if not profile or not profile.cv:
                return Response(
                    {
                        'detail': (
                            'No saved CV was found in your profile.'
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        use_saved_cv = (
            str(self.request.data.get('use_saved_cv', '')).lower()
            == 'true'
        )

        if use_saved_cv:
            profile = self.request.user.student_profile

            serializer.save(
                student=self.request.user,
                cv=profile.cv
            )
        else:
            serializer.save(
                student=self.request.user
            )


class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            student=self.request.user
        ).select_related('internship').order_by('-applied_at')

class EmployerApplicationListView(generics.ListAPIView):
    serializer_class = EmployerApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            internship__employer=self.request.user
        ).select_related(
            'internship'
        ).order_by('-applied_at')

class EmployerApplicationStatusUpdateView(generics.UpdateAPIView):
    serializer_class = EmployerApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            internship__employer=self.request.user
        )

    def update(self, request, *args, **kwargs):
        application = self.get_object()

        new_status = request.data.get('status')

        valid_statuses = [
            'Applied',
            'Under Review',
            'Shortlisted',
            'Interview',
            'Accepted',
            'Rejected',
        ]

        if new_status not in valid_statuses:
            return Response(
                {
                    'detail': 'Invalid application status.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = new_status
        application.save(update_fields=['status'])

        serializer = self.get_serializer(application)

        return Response(serializer.data)


class EmployerDashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_internships = Internship.objects.filter(
            employer=request.user
        ).count()

        total_applicants = Application.objects.filter(
            internship__employer=request.user
        ).count()

        accepted_applicants = Application.objects.filter(
            internship__employer=request.user,
            status='Accepted'
        ).count()

        pending_applicants = Application.objects.filter(
            internship__employer=request.user,
            status__in=[
                'Applied',
                'Under Review',
            ]
        ).count()

        return Response({
            'total_internships': total_internships,
            'total_applicants': total_applicants,
            'accepted_applicants': accepted_applicants,
            'pending_applicants': pending_applicants,
        })

class EmployerInternshipApplicantsView(generics.ListAPIView):
    serializer_class = EmployerApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        internship_id = self.kwargs['internship_id']

        return Application.objects.filter(
            internship_id=internship_id,
            internship__employer=self.request.user
        ).select_related(
            'internship'
        ).order_by('-applied_at')