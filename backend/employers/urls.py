from django.urls import path

from .views import (
    EmployerRegistrationView,
    EmployerLoginView,
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
]