from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeVersionViewSet

router = DefaultRouter()
router.register(r'resume-versions', ResumeVersionViewSet, basename='resumeversion')

urlpatterns = [
    path('', include(router.urls)),
]
