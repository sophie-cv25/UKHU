import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
  standalone: false
})
export class CambiarContrasenaPage implements OnInit {
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  repetirContrasena: string = '';

  constructor(private authService: AuthserviceService) {}

  ngOnInit() {}

  cambiarContrasena() {
    if (this.nuevaContrasena.length < 6) {
      console.error('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.nuevaContrasena !== this.repetirContrasena) {
      console.error('Las contraseñas no coinciden.');
      return;
    }

    this.authService.cambiarContrasena(this.nuevaContrasena)
      .then(() => console.log('Contraseña actualizada con éxito'))
      .catch(error => console.error('Error al cambiar contraseña:', error));
  }
}
