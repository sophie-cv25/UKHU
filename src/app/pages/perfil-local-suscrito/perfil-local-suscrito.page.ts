import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-local-suscrito',
  templateUrl: './perfil-local-suscrito.page.html',
  styleUrls: ['./perfil-local-suscrito.page.scss'],
  standalone: false
})
export class PerfilLocalSuscritoPage implements OnInit {
  nombreLocal: string = '';
  emailLocal: string = '';
  horarioApertura: string = '';
  horarioCierre: string = '';

  constructor(private router: Router) {} // 🔹 Se inyecta el `Router` aquí

  ngOnInit() {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const datos = JSON.parse(userData);
      this.nombreLocal = datos.nombre || 'No disponible';
      this.emailLocal = datos.mail || 'No disponible';

      // 🔹 Extraemos apertura y cierre desde el objeto "horario"
      if (datos.horario) {
        this.horarioApertura = datos.horario.apertura || 'No especificado';
        this.horarioCierre = datos.horario.cierre || 'No especificado';
      } else {
        this.horarioApertura = 'No especificado';
        this.horarioCierre = 'No especificado';
      }
    }
  }

  cerrarSesion() {
    localStorage.clear(); // 🔹 Borra todos los datos del usuario en localStorage
    console.log('Sesión cerrada. Se eliminaron los datos de localStorage.');
    
    this.router.navigate(['/sign-in']); // 🔹 Redirige correctamente a la pantalla de inicio de sesión
  }
}
