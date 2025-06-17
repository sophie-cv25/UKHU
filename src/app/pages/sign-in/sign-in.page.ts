import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private dbService: DatabaseService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async mostrarAlerta(mensaje: string, titulo: string = 'Error') {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async iniciarSesion() {
    if (!this.email || !this.password) {
      this.mostrarAlerta('Por favor, ingresa tu correo y contraseña.', 'Advertencia');
      return;
    }

    this.authService.iniciarSesion(this.email, this.password)
      .then(user => {
        if (!user) {
          this.mostrarAlerta('Credenciales incorrectas. Verifica tu correo y contraseña.');
          return;
        }

        console.log('Inicio de sesión exitoso');
        console.log('UID:', user.uid);
        console.log('Correo electrónico:', user.email);
        console.log('Nombre de usuario (Firebase):', user.displayName || 'No disponible');

        this.dbService.getCollectionByCustomparam('users', 'uid', user.uid).subscribe(userDataArray => {
          if (!userDataArray || userDataArray.length === 0) {
            this.mostrarAlerta('Error: No se encontraron datos del usuario en Firestore.');
            return;
          }

          const userData = userDataArray[0];
          console.log('Datos completos obtenidos desde Firestore:', userData);

          localStorage.setItem('userData', JSON.stringify(userData));
          this.mostrarAlerta('Inicio de sesión exitoso.', '¡Bienvenido!').then(() => {
            this.router.navigate(['/perfil']);
            console.log('Datos del usuario guardados en localStorage.');
          });
        });
      })
      .catch(err => {
        console.error('Error en inicio de sesión:', err);
        this.mostrarAlerta('Credenciales incorrectas. Verifica tu correo y contraseña.');
      });
  }

  recuperarPassword() {
    if (!this.email) {
      this.mostrarAlerta('Por favor, ingresa tu correo electrónico.', 'Advertencia');
      return;
    }
  }
}
