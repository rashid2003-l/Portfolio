from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('AI', 'Artificial Intelligence'),
        ('ML', 'Machine Learning'),
        ('Web', 'Web Development'),
        ('Networking', 'Network Engineering'),
        ('Cybersecurity', 'Cybersecurity'),
        ('Data', 'Data Analytics'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    details = models.TextField(blank=True)
    challenges = models.TextField(blank=True)
    technologies = models.JSONField(default=list)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(max_length=500, blank=True, null=True)
    live_url = models.URLField(max_length=500, blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Web')
    featured = models.BooleanField(default=False)
    year = models.CharField(max_length=4, default='2024')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
