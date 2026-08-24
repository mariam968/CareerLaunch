from django.urls import path

from .views import InternshipListView, InternshipDetailView


urlpatterns = [
    path('', InternshipListView.as_view(), name='internship-list'),

    path(
        '<int:pk>/',
        InternshipDetailView.as_view(),
        name='internship-detail'
    ),
]