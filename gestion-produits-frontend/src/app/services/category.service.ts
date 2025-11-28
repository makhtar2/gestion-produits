// src/app/services/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
export interface Categorie {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // L'URL de notre endpoint Django
  private apiUrl = 'http://127.0.0.1:8000/api/categories/';

  // Injection du HttpClient
  constructor(private http: HttpClient) { } 

  // --- CRUD Opérations ---

  // READ (Liste des catégories)
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // CREATE (Ajouter une catégorie)
  addCategory(category: { nom: string }): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, category);
  }

  // UPDATE (Modifier une catégorie)
  updateCategory(category: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}${category.id}/`, category);
  }

  // DELETE (Supprimer une catégorie)
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}