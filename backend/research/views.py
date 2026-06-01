from rest_framework import viewsets
from .models import Publication
from .serializers import PublicationSerializer

class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all().order_by('-year', '-created_at')
    serializer_class = PublicationSerializer
