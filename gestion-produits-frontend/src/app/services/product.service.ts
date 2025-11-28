import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL API 
  private apiUrl = 'http://127.0.0.1:8000/api/produits/'; 

  constructor(private http: HttpClient) { }

  // CRUD

  // READ 
  getProducts(categoryId?: number, searchQuery?: string): Observable<Produit[]> {
    let params = new HttpParams();

    if (categoryId) {
      params = params.set('categorie', categoryId.toString());
    }

    if (searchQuery && searchQuery.trim().length > 0) {
      params = params.set('search', searchQuery.trim());
    }

    return this.http.get<Produit[]>(this.apiUrl, { params });
  }

  // CREATE / UPDATE
  // Accepte un objet Produit complet (id est optionnel/existe déjà)
  saveProduct(product: Produit): Observable<Produit> {
    
    // Extrait les données que l'API est censée recevoir (sans categorie_detail)
    const productData = {
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      categorie: product.categorie // ID
    };

    if (product.id) {
        // UPDATE 
        const url = `${this.apiUrl}${product.id}/`;
        return this.http.put<Produit>(url, productData);
    } else {
        // CREATE
        return this.http.post<Produit>(this.apiUrl, productData);
    }
  }

  // CREATE 
  addProduct(product: Produit): Observable<Produit> {
    const productData = {
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      categorie: product.categorie
    };
    return this.http.post<Produit>(this.apiUrl, productData);
  }

  // UPDATE 
  updateProduct(product: Produit): Observable<Produit> {
    if (!product.id) {
      throw new Error('Product ID is required for update');
    }
    const productData = {
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      categorie: product.categorie
    };
    const url = `${this.apiUrl}${product.id}/`;
    return this.http.put<Produit>(url, productData);
  }

  // DELETE
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}