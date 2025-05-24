import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 🔹 Importamos Router
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-up-comercio',
  templateUrl: './sign-up-comercio.page.html',
  styleUrls: ['./sign-up-comercio.page.scss'],
  standalone: false,
})
export class SignUpComercioPage {
  nombre: string = '';
  mail: string = '';
  password: string = '';
  confirmPassword: string = '';
  referencia: string = ''; // 🔹 Teléfono como string
  tipoComida: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  zona: string = '';
  coordenadas: string = '';

  menu: { [key: string]: { descripcion: string; imagen: string; nombre: string; precio: number } } = {}; // 🔹 Mapa en lugar de array
  horarioAtencion: { [key: string]: { apertura: string; cierre: string } } = {}; // 🔹 Mapa vacío para futuras ediciones

  constructor(
    private authService: AuthserviceService,
    private db: DatabaseService,
    private router: Router // 🔹 Agregamos el Router
  ) {}

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validarPassword(password: string): boolean {
    return password.length >= 6;
  }

  registrarComercio() {
    if (!this.validarEmail(this.mail)) {
      console.error('El correo electrónico no tiene un formato válido.');
      return;
    }

    if (!this.validarPassword(this.password)) {
      console.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden.');
      return;
    }

    this.authService.registrar(this.mail, this.password)
      .then(user => {
        if (user) {
          console.log('Registro exitoso:', user);
          localStorage.setItem('userUID', user.uid);

          const coordsArray = this.coordenadas.split(',');
          if (coordsArray.length !== 2) {
            console.error('Error: Formato de coordenadas incorrecto.');
            return;
          }

          const latitud = parseFloat(coordsArray[0].trim());
          const longitud = parseFloat(coordsArray[1].trim());

          // 🔹 Construimos la estructura del comercio con menú y horario vacío
          const comercioData = {
            uid: user.uid,
            nombre: this.nombre,
            mail: this.mail,
            referencia: this.referencia,
            tipoComida: this.tipoComida,
            descripcion: this.descripcion,
            ubicacion: this.ubicacion,
            zona: this.zona,
            latitud: latitud,
            longitud: longitud,
            menu: {}, // 🔹 Mapa vacío para el menú
            horarioAtencion: {} // 🔹 Mapa vacío para el horario, listo para futuras ediciones
          };

          // 🔹 Guardamos el comercio en Firestore
          return this.db.updateFireStoreDocument('restaurantes', user.uid, comercioData)
            .then(() => {
              console.log('Comercio guardado en Firestore');

              // 🔹 Redireccionamos al signin-comercio
              this.router.navigate(['/signin-comercio']);
            })
            .catch(err => console.error('Error guardando comercio:', err));
        }
        return null;
      })
      .catch(err => console.error('Error en registro:', err));
  }
}
