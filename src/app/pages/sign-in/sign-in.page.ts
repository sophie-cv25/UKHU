import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: false
})
export class SignInPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthserviceService, 
    private dbService: DatabaseService ,
    private router: Router 
  ) {}

  iniciarSesion() {
    if (!this.email || !this.password) {
      console.error('Por favor, ingresa tu correo y contraseña.');
      return;
    }

this.authService.iniciarSesion(this.email, this.password)
  .then(user => {
    if (!user) {
      console.error('Error: No se pudo obtener el usuario.');
      return;
    }

    console.log('Inicio de sesión exitoso');
    console.log('UID:', user.uid);
    console.log('Correo electrónico:', user.email);
    console.log('Nombre de usuario (Firebase):', user.displayName || 'No disponible');

    this.dbService.getCollectionByCustomparam('users', 'uid', user.uid).subscribe(userDataArray => {
      if (!userDataArray || userDataArray.length === 0) {
        console.error('Error: No se encontraron datos del usuario en Firestore.');
        return;
      }

      const userData = userDataArray[0];

      console.log('Datos completos obtenidos desde Firestore:', userData);

      // Guardar los datos en localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Datos del usuario guardados en localStorage.');

      // Redirigir a /perfil después de guardar los datos
      this.router.navigate(['/perfil']);
    });
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
