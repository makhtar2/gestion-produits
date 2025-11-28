// src/app/components/category-form/category-form.component.ts

import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core'; // <<< Ajout de Input, OnChanges, SimpleChanges
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, Categorie } from '../../services/category.service'; // Assurez-vous d'importer l'interface Categorie
import { Observable  } from 'rxjs';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnChanges { // <<< Implémentation de OnChanges

  categoryForm: FormGroup;
  
  // 1. Propriété pour recevoir l'objet à modifier du parent
  @Input() category: Categorie | null = null; 
  
  @Output() categoryAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  // 2. Méthode pour détecter les changements de l'objet Input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category) {
      // Si une catégorie est reçue, nous passons en mode modification
      this.categoryForm.patchValue(this.category);
    } else if (changes['category'] && !this.category) {
      // Si l'Input est réinitialisé, nous réinitialisons le formulaire
      this.categoryForm.reset();
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      let apiCall: Observable<Categorie>;
      
      // 3. Détection du mode : Modification ou Création
      if (this.category && this.category.id) {
        // Mode MODIFICATION (UPDATE/PUT) : on passe l'ID et on appelle updateCategory
        apiCall = this.categoryService.updateCategory({
          ...formData, // {nom: 'Nouveau Nom'}
          id: this.category.id // Ajout de l'ID pour le PUT de Django
        });
      } else {
        // Mode CRÉATION (CREATE/POST)
        apiCall = this.categoryService.addCategory(formData);
      }
      
      // Abonnement commun
      apiCall.subscribe(
        (result) => {
          console.log('Opération réussie:', result);
          this.categoryForm.reset();
          this.categoryAdded.emit(); // Rafraîchissement de la liste
        },
        (error) => {
          console.error('Erreur lors de l’opération:', error);
          alert(`Erreur : ${error.statusText}`);
        }
      );
    }
  }
}