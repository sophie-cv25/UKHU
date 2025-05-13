import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: false
})
export class SignInPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthserviceService) {}

  iniciarSesion() {
    if (!this.email || !this.password) {
      console.error('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    this.authService.iniciarSesion(this.email, this.password)
      .then(user => {
        console.log('Inicio de sesión exitoso:', user);
      })
      .catch(err => console.error('Error en inicio de sesión:', err));
  }
  recuperarPassword() {
    if (!this.email) {
      console.error('Por favor, ingresa tu correo electrónico.');
      return;
    }
  
  }
  
}
