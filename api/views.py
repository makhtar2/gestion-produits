# api/views.py

from .models import Categorie, Produit
from .serializers import CategorieSerializer, ProduitSerializer
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication 

class CategorieViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication] 
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    

class ProduitViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication] 
    
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    def get_queryset(self):
        queryset = Produit.objects.all()
        return queryset