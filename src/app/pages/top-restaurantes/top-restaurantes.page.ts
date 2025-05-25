import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-top-restaurantes',
  templateUrl: './top-restaurantes.page.html',
  styleUrls: ['./top-restaurantes.page.scss'],
  standalone: false
})
export class TopRestaurantesPage implements OnInit {
  topRestaurantes: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.databaseService.getTopRestaurantes().subscribe(restaurantes => {
      console.log('Restaurantes obtenidos:', restaurantes);
      restaurantes.forEach((restaurante, idx) => {
        console.log(`Restaurante #${idx + 1}:`, restaurante.nombre, 'Rating:', restaurante.rating);
      });
      this.topRestaurantes = restaurantes;
      this.cdr.detectChanges(); // Detectar cambios manualmente
      console.log('Array para el HTML:', this.topRestaurantes);
    });
  }
}