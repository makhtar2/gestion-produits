# gestion_produits/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import CategorieViewSet, ProduitViewSet
from django.views.generic import RedirectView # <<< NOUVEL IMPORT

router = DefaultRouter()
router.register('categories', CategorieViewSet, basename='categorie1')
router.register('produits', ProduitViewSet, basename='produit')


urlpatterns = [
    path('', RedirectView.as_view(url='api/', permanent=False)), 
    
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]