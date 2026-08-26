from django.contrib.auth.models import User
from django.db import models
from internships.models import Internship


class Application(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Under Review', 'Under Review'),
        ('Shortlisted', 'Shortlisted'),
        ('Interview', 'Interview'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(
       User,
       on_delete=models.CASCADE,
       related_name='applications',
       null=True,
       blank=True
    )

    internship = models.ForeignKey(
        Internship,
        on_delete=models.CASCADE,
        related_name='applications'
    )

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    institution = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    year_of_study = models.CharField(max_length=50)

    cover_letter = models.TextField()

    cv = models.FileField(
        upload_to='applications/cvs/',
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='Applied'
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.full_name} - {self.internship.title}'