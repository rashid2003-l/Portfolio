from rest_framework import serializers
from .models import ResumeVersion

class ResumeVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeVersion
        fields = '__all__'
