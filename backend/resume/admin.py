from django.contrib import admin
from .models import ResumeVersion

@admin.register(ResumeVersion)
class ResumeVersionAdmin(admin.ModelAdmin):
    list_display = ('category', 'title', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')
