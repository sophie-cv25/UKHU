import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Location } from '@angular/common';
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

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Supón que el restauranteId viene por query params o route params
    this.restauranteId = this.route.snapshot.paramMap.get('id') || '';
    // Supón que el nombre de usuario está en localStorage
    const userData = localStorage.getItem('userData');
    this.usuarioNombre = userData ? JSON.parse(userData).nombre : 'Anónimo';
  }

  goBack() {
    this.router.navigate(['/resenas']);
  }

  enviarResena() {
  if (!this.restauranteId) {
    alert('No se encontró el restaurante.');
    return;
  }

  const resena = {
    comentario: this.comentario,
    usuario: this.usuarioNombre,
    fecha: new Date()
  };

  console.log('RestauranteId:', this.restauranteId);
  console.log('Reseña:', resena);
  
  // NO DESCOMENTAR ESTA FUNCION (FUNCION CON ERROR), GRACIAS -GIANIS
  // this.databaseService.addResenaToRestaurante(this.restauranteId, resena)
  //   .then(() => {
  //     alert('¡Reseña enviada!');
  //     this.comentario = '';
  //   })
  //   .catch((err) => {
  //     alert('Error al enviar la reseña');
  //     console.error('Error al guardar reseña:', err);
  //   });
  // PIPIPIPIPIPI


}
}