from django.urls import path

from .views import (
    StudentLoginView,
    StudentRegistrationView,
)


urlpatterns = [
    path(
        'register/',
        StudentRegistrationView.as_view(),
        name='student-register'
    ),

    path(
        'login/',
        StudentLoginView.as_view(),
        name='student-login'
    ),
]