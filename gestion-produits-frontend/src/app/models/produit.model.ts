import { Categorie } from './categorie.model';

export interface Produit {
  id?: number; 
  nom: string;
  description: string;
  prix: number;
  categorie: number; 
  categorie_detail?: Categorie;
}