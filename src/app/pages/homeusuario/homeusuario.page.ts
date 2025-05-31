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
  restaurantesVisitados: any[] = [];
  restaurantesMejores: any[] = [];
  usuarioId: string | null = null;

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioId = this.obtenerUsuarioIdDesdeLocalStorage();

    if (!this.usuarioId) {
      alert("Debes iniciar sesión para ver tu historial de visitas.");
      this.router.navigate(['/onboardingf']);
      return;
    }

    // Obtener todos los restaurantes
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any[]) => {
      console.log('Restaurantes obtenidos:', data);
      this.restaurantes = data;

      // Obtener historial de restaurantes visitados
      this.databaseService.getHistorialDeUsuario(this.usuarioId!).subscribe((historial: any[]) => {
        console.log('Historial obtenido:', historial);

        this.restaurantesVisitados = historial.map(h => {
          const restauranteEncontrado = data.find(r => r.id === h.restaurante_id);

          return {
            id: h.restaurante_id,
            nombre: h.nombre_restaurante,
            imagen: restauranteEncontrado ? restauranteEncontrado.imagen : 'assets/icon/default-image.png'
          };
        });
      });
    });

    // Obtener mejores rankeados
    this.databaseService.getTopRestaurantes().subscribe((topRestaurantes: any[]) => {
      console.log('Mejores rankeados:', topRestaurantes);
      this.restaurantesMejores = topRestaurantes;
    });
  }

  irADetalle(restaurante: any) {
    this.router.navigate(['/restaurante-detalle', restaurante.id]);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  obtenerUsuarioIdDesdeLocalStorage(): string | null {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData?.id || null;
  }

  irATopRestaurantes() {
  this.router.navigate(['/top-restaurantes']);
}

}