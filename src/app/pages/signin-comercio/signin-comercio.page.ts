import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-comercio',
  templateUrl: './signin-comercio.page.html',
  styleUrls: ['./signin-comercio.page.scss'],
  standalone: false
})
export class SigninComercioPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthserviceService,
    private dbService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {}

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

        this.dbService.getCollectionByCustomparam('restaurantes', 'uid', user.uid).subscribe(restauranteDataArray => {
          if (!restauranteDataArray || restauranteDataArray.length === 0) {
            console.error('Error: No se encontraron datos del restaurante en Firestore.');
            return;
          }

          const restauranteData = restauranteDataArray[0];

          console.log('Datos del restaurante obtenidos desde Firestore:', restauranteData);

          localStorage.setItem('userData', JSON.stringify(restauranteData));
          console.log('Datos del restaurante guardados en localStorage.');

          this.router.navigate(['/perfil-local-suscrito']);
        });
      })
      .catch(err => console.error('Error en inicio de sesión:', err));
  }
}
