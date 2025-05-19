import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-homeusuario',
  templateUrl: './homeusuario.page.html',
  styleUrls: ['./homeusuario.page.scss'],
  standalone: false,
})
export class HomeusuarioPage implements OnInit {
  restaurantes: any[] = [];
  restaurantesCerca: any[] = [];
  restaurantesRecientes: any[] = [];
  restaurantesRankeados: any[] = [];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any[]) => {
      this.restaurantes = data;
      this.restaurantesCerca = data.slice(0, 5);
      this.restaurantesRecientes = data.slice(5, 10);
      this.restaurantesRankeados = data.slice(0, 4);
    });
  }
}