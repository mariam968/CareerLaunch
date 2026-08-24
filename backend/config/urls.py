from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),

    path(
        'api/internships/',
        include('internships.urls')
    ),

    path(
        'api/applications/',
        include('applications.urls')
    ),
]