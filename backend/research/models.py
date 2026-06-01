from django.db import models

class Publication(models.Model):
    title = models.CharField(max_length=300)
    abstract = models.TextField()
    authors = models.CharField(max_length=300)
    journal = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    pdf_file = models.FileField(upload_to='publications/', blank=True, null=True)
    pdf_url = models.URLField(max_length=500, blank=True, null=True)
    doi_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
