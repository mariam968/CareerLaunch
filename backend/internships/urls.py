from django.urls import path

from .views import (
    InternshipListView,
    InternshipDetailView,
    EmployerInternshipCreateView,
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
]