from django.db import models

class ResumeVersion(models.Model):
    CATEGORY_CHOICES = [
        ('AI', 'AI & Machine Learning'),
        ('Networking', 'Cybersecurity & Networks'),
        ('General', 'General Software Engineer'),
    ]

    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)
    file = models.FileField(upload_to='resumes/', blank=True, null=True)
    file_url = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_category_display()} - {self.title}"
