import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.page.html',
  styleUrls: ['./restaurante-detalle.page.scss'],
  standalone: false
})

export class RestauranteDetallePage implements OnInit {
  restaurante: any;

  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL

    if (id) {
      console.log('🔍 Buscando restaurante con ID:', id);

      this.databaseService.getDocumentById('restaurantes', id).subscribe((doc) => {
        if (doc.payload.exists) {
          console.log('✅ Restaurante encontrado:', doc.payload.data()); // Verifica los datos
          this.restaurante = doc.payload.data();
        } else {
          console.log('❌ Restaurante no encontrado');
        }
      });
    }
  }
}
