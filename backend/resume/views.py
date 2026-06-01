from rest_framework import viewsets
from .models import ResumeVersion
from .serializers import ResumeVersionSerializer

class ResumeVersionViewSet(viewsets.ModelViewSet):
    queryset = ResumeVersion.objects.all().order_by('-created_at')
    serializer_class = ResumeVersionSerializer
