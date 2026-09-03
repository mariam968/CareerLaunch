from django.contrib.auth.models import User
from django.db import models


class EmployerProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employer_profile'
    )

    company_name = models.CharField(max_length=200)
    company_email = models.EmailField()
    phone = models.CharField(max_length=20)

    location = models.CharField(max_length=100)

    industry = models.CharField(max_length=100)

    description = models.TextField(blank=True)

    website = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name