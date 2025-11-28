import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Vérifiez que ces chemins sont corrects :
import { Produit } from 'src/app/models/produit.model';
import { Categorie } from 'src/app/models/categorie.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: Produit | null = null;
  @Output() productSaved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  productForm: FormGroup;
  categories: Categorie[] = []; 
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: [0, [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.isEditMode = !!this.product.id;
      this.initializeForm(this.product);
    } else if (changes['product'] && !this.product) {
      this.resetForm();
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Categorie[]) => { 
        this.categories = data;
      },
      (error: any) => console.error("Erreur de chargement des catégories:", error)
    );
  }

  initializeForm(product: Produit): void {
    this.productForm.patchValue({
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      categorie: product.categorie_detail ? product.categorie_detail.id : product.categorie 
    });
  }
  
  resetForm(): void {
    this.productForm.reset({
      nom: '',
      description: '',
      prix: 0,
      categorie: ''
    });
    this.isEditMode = false;
  }

  
  onSubmit(): void {
    if (this.productForm.invalid) {
      console.error("Le formulaire est invalide.");
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const productToSave: Produit = {
      id: this.isEditMode && this.product ? this.product.id : undefined,
      nom: formValue.nom,
      description: formValue.description,
      prix: formValue.prix,
      categorie: formValue.categorie, 
      categorie_detail: this.product?.categorie_detail 
    };

    if (this.isEditMode && productToSave.id) {
      this.productService.updateProduct(productToSave).subscribe({
        next: () => this.handleSuccess('Produit mis à jour avec succès.'),
        error: (err) => console.error('Erreur de mise à jour:', err)
      });
    } else {
      this.productService.addProduct(productToSave).subscribe({
        next: () => this.handleSuccess('Produit ajouté avec succès.'),
        error: (err) => console.error('Erreur d\'ajout:', err)
      });
    }
  }

  handleSuccess(message: string): void {
    console.log(message);
    this.resetForm();
    this.productSaved.emit();
  }

 
  cancelEdit(): void {
    this.onCancel();
  }

  onCancel(): void {
    this.resetForm();
    this.cancel.emit();
  }
}