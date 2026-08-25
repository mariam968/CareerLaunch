from django.contrib.auth.models import User
from django.db import models


class StudentProfile(models.Model):
    user = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    related_name='student_profile',
    null=True,
    blank=True
)

    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    institution = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    year_of_study = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    skills = models.TextField(blank=True)
    cv = models.FileField(
        upload_to='cvs/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name