# pages/urls.py
from django.urls import path
from .views import PublicationViewSet
from .views import get_csrf_token

publication_list = PublicationViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

publication_detail = PublicationViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('publications/', publication_list, name='publication-list'),
    path('publications/<int:pk>/', publication_detail, name='publication-detail'),
     path('csrf/', get_csrf_token),
]
