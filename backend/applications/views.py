from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Application
from .serializers import ApplicationSerializer


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