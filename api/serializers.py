from rest_framework import serializers
from .models import Categorie, Produit

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class ProduitSerializer(serializers.ModelSerializer):
    
    categorie_detail = CategorieSerializer(source='categorie', read_only=True) 

    categorie = serializers.PrimaryKeyRelatedField(
        queryset=Categorie.objects.all(), 
        write_only=True 
    )

    class Meta:
        model = Produit
        fields = ['id', 'nom', 'prix', 'categorie', 'categorie_detail'] 
        