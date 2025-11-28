import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Produit } from '../../models/produit.model'; 

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Produit[] = [];
  selectedProduct: Produit | null = null; 

 
  constructor(private productService: ProductService) { } 

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.selectedProduct = null; 
      },
      error: (error) => {
        console.error("Erreur lors du chargement des produits:", error);
      }
    });
  }
  
  selectProduct(product: Produit): void {
    this.selectedProduct = { ...product }; 
  }
  
  cancelEdit(): void {
    this.selectedProduct = null;
  }

  deleteProduct(id: number | undefined): void { 
    if (id === undefined || !window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log(`Produit ${id} supprimé`);
        this.loadProducts(); // Recharge la liste
      },
      error: (error) => {
        console.error("Erreur de suppression du produit:", error);
        console.warn("Erreur lors de la suppression du produit. Vérifiez la console pour les détails.");
      }
    });
  }
}