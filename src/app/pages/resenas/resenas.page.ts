import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ✅ Aseguramos que `map` esté importado correctamente

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
  standalone: false,
})
export class ResenasPage implements OnInit {
  resenas$: Observable<any[]> | undefined;
  restauranteId: string = '';

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute) {}

  ngOnInit() {
    // 🔹 Extraemos el ID del restaurante desde la URL
    this.restauranteId = this.route.snapshot.paramMap.get('restauranteId') || '';

    console.log(`🆔 ID recuperado en ResenasPage: ${this.restauranteId}`);

    if (!this.restauranteId) {
      console.error('⚠️ No se encontró un ID en la ruta.');
      return;
    }

    // 🔹 Recuperamos el documento completo del restaurante desde Firestore
    this.resenas$ = this.databaseService.getDocumentById('restaurantes', this.restauranteId).pipe(
      map(doc => {
        if (!doc.payload.exists) {
          console.error(`⚠️ No se encontró el documento con ID: ${this.restauranteId}`);
          return [];
        }

        const data = doc.payload.data() as any;
        console.log(`✅ Documento completo obtenido:`, data);

        // 🔹 Extraemos las reseñas y aseguramos que siempre sea un array válido
        return data.resenas || [];
      })
    );
  }
}
