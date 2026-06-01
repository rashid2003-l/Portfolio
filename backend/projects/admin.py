from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'year')
    search_fields = ('title', 'description', 'details')
