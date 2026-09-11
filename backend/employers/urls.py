from django.urls import path

from .views import (
    EmployerRegistrationView,
    EmployerLoginView,
    EmployerProfileView,
)


urlpatterns = [
    path(
        'register/',
        EmployerRegistrationView.as_view(),
        name='employer-register'
    ),

    path(
        'login/',
        EmployerLoginView.as_view(),
        name='employer-login'
    ),

    path(
        'profile/',
        EmployerProfileView.as_view(),
        name='employer-profile'
    ),
]