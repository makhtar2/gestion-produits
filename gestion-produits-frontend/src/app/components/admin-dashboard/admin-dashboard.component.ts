// src/app/components/admin-dashboard/admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  // Propriété pour suivre l'onglet actif 
  activeTab: 'produits' | 'categories' = 'produits'; 

  constructor() { }

  ngOnInit(): void {
  }

  // Méthode pour changer l'onglet
  setActiveTab(tab: 'produits' | 'categories'): void {
    this.activeTab = tab;
  }

  // Fonction pour la comparaison 
  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}