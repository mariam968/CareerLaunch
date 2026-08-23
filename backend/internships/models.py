from django.db import models


class Internship(models.Model):
    INTERNSHIP_TYPES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Hybrid', 'Hybrid'),
        ('Remote', 'Remote'),
    ]

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100)

    internship_type = models.CharField(
        max_length=50,
        choices=INTERNSHIP_TYPES
    )

    category = models.CharField(max_length=100)

    description = models.TextField()

    requirements = models.TextField()

    responsibilities = models.TextField()

    deadline = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} - {self.company}'