from django.db import models

class Categorie(models.Model):
    nom = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nom

class Produit(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.DecimalField(max_digits=8, decimal_places=2)
    categorie = models.ForeignKey('Categorie', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nom