// src/app/components/category-list/category-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CategoryService, Categorie } from '../../services/category.service'; 

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  
  categories: Categorie[] = [];

  selectedCategory: Categorie | null = null;
  // Injection du CategoryService
  constructor(private categoryService: CategoryService) { } 

  selectCategory(category: Categorie): void {

    this.selectedCategory = { ...category }; 
  }


  ngOnInit(): void {
    this.loadCategories(); // Charge la liste au démarrage
  }

  cancelEdit(): void {
    this.selectedCategory = null;
  }

  // Méthode pour charger les données (réutilisable)
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error("Erreur lors du chargement:", error);
      }
    );
  }

  // DELETE
  deleteCategory(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          console.log(`Catégorie ${id} supprimée`);
          this.loadCategories(); // Recharge la liste après la suppression
        },
        (error) => {
          console.error("Erreur de suppression:", error);
          alert("Erreur lors de la suppression. Il se peut que des produits y soient liés.");
        }
      );
    }
  }
}