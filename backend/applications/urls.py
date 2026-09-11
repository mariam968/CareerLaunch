from django.urls import path

from .views import (
    ApplicationCreateView,
    ApplicationListView,
    EmployerApplicationListView,
    EmployerApplicationStatusUpdateView,
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

path(
    'employer/<int:pk>/status/',
    EmployerApplicationStatusUpdateView.as_view(),
    name='employer-application-status'
),
]