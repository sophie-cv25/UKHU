import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dejar-resena',
  templateUrl: './dejar-resena.page.html',
  styleUrls: ['./dejar-resena.page.scss'],
  standalone: false
})
export class DejarResenaPage implements OnInit {
  comentario: string = '';
  restauranteId: string = '';
  usuarioNombre: string = '';
  usuarioId: string = '';
  resenas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Obtener el ID del restaurante desde la URL
    this.restauranteId = this.route.snapshot.paramMap.get('id') || '';

    // Obtener datos del usuario desde `localStorage`
    const userData = localStorage.getItem('userData');
    if (userData) {
      const usuario = JSON.parse(userData);
      this.usuarioNombre = usuario.nombre;
      this.usuarioId = usuario.id || 'anonimo';
    } else {
      this.usuarioNombre = 'Anónimo';
      this.usuarioId = 'anonimo';
    }

    this.cargarResenas();
  }

  cargarResenas() {
    this.databaseService.getDocumentById('restaurantes', this.restauranteId).subscribe(restauranteDoc => {
      if (restauranteDoc && restauranteDoc.payload.exists) {
        const data = restauranteDoc.payload.data();
        this.resenas = data.resenas || []; // Cargar reseñas existentes
      } else {
        console.error('No se encontró el restaurante en Firestore.');
      }
    });
  }

  guardarResenaTemporal() {
    const nuevaResena = {
      idUsuario: this.usuarioId,
      usuario: this.usuarioNombre,
      comentario: this.comentario,
      fechaCreacion: new Date().toISOString()
    };

    // Guardar en `localStorage` temporalmente
    localStorage.setItem('reseñaTemporal', JSON.stringify(nuevaResena));

    console.log('Reseña guardada temporalmente:', nuevaResena);
  }

  enviarResena() {
  if (!this.restauranteId) {
    alert('No se encontró el restaurante.');
    return;
  }

  if (!this.comentario.trim()) {
    alert('La reseña no puede estar vacía.');
    return;
  }

  const nuevaResena = {
    idUsuario: this.usuarioId,
    usuario: this.usuarioNombre,
    comentario: this.comentario,
    fechaCreacion: new Date().toISOString()
  };

  this.databaseService.updateResenasEnRestaurante(this.restauranteId, nuevaResena)
    .then(() => {
      alert('¡Reseña enviada y guardada en Firestore!');
      this.comentario = '';  // Limpiar campo de texto
    })
    .catch((err) => {
      alert('Error al enviar la reseña');
      console.error('Error al guardar reseña:', err);
    });
}

  actualizarResenasEnFirestore() {
    this.databaseService.updateFireStoreDocument('restaurantes', this.restauranteId, { resenas: this.resenas })
      .then(() => console.log('✅ Reseñas actualizadas en Firestore'))
      .catch(error => console.error('⚠️ Error al actualizar reseñas:', error));
  }

  goBack() {
    this.router.navigate(['/resenas']);
  }
}
