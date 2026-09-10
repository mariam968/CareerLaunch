from django.urls import path

from .views import (
    ApplicationCreateView,
    ApplicationListView,
    EmployerApplicationListView,
)


urlpatterns = [
    path(
        '',
        ApplicationListView.as_view(),
        name='application-list'
    ),

    path(
        'create/',
        ApplicationCreateView.as_view(),
        name='application-create'
    ),

    path(
    'employer/',
    EmployerApplicationListView.as_view(),
    name='employer-application-list'
),
]