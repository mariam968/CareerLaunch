from django.urls import path

from .views import (
    InternshipListView,
    InternshipDetailView,
    EmployerInternshipCreateView,
)
from .views import (
    InternshipListView,
    InternshipDetailView,
    EmployerInternshipCreateView,
    EmployerInternshipListView,
)

urlpatterns = [
    path(
        '',
        InternshipListView.as_view(),
        name='internship-list'
    ),

    path(
        '<int:pk>/',
        InternshipDetailView.as_view(),
        name='internship-detail'
    ),

    path(
        'employer/create/',
        EmployerInternshipCreateView.as_view(),
        name='employer-internship-create'
    ),

    path(
    'employer/',
    EmployerInternshipListView.as_view(),
    name='employer-internship-list'
    ),
]