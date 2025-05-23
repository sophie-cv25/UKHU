import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeusuario',
  templateUrl: './homeusuario.page.html',
  styleUrls: ['./homeusuario.page.scss'],
  standalone: false,
})
export class HomeusuarioPage implements OnInit {
  restaurantes: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any[]) => {
      this.restaurantes = data;
    });
  }

  irADetalle(restaurante: any) {
    this.router.navigate(['/restaurante-detalle', restaurante.id]);
  }
}
