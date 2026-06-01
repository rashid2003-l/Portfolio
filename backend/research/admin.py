from django.contrib import admin
from .models import Publication

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'authors', 'journal', 'year', 'created_at')
    list_filter = ('year', 'journal')
    search_fields = ('title', 'authors', 'abstract')
