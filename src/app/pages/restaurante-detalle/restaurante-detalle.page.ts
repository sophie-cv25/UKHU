import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.page.html',
  styleUrls: ['./restaurante-detalle.page.scss'],
  standalone: false
})
export class RestauranteDetallePage implements OnInit {
  restaurante: any;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.databaseService.getDocumentById('restaurantes', id).subscribe((doc) => {
        if (doc.payload.exists) {
          // Incluye el id en el objeto restaurante
          this.restaurante = { id, ...doc.payload.data() };
        }
      });
    }
  }

  comoLlegar() {
    if (this.restaurante?.latitud && this.restaurante?.longitud && this.restaurante?.id) {
      this.router.navigate(['/buscar'], {
        queryParams: {
          latitud: this.restaurante.latitud,
          longitud: this.restaurante.longitud,
          id: this.restaurante.id
        }
      });
    }
  }

    goBack() {
    this.location.back();
  }
}
