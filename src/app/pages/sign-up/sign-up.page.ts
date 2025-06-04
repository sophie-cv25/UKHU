import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthserviceService, private db: DatabaseService, private router: Router) {}

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  }

  validarPassword(password: string): boolean {
    return password.length >= 6; 
  }

  registrarUsuario() {
    if (!this.validarEmail(this.email)) {
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

    this.authService.registrar(this.email, this.password)
      .then(user => {
        if (user) {
          console.log('Registro exitoso:', user);
          localStorage.setItem('userUID', user.uid);

          // 🔹 Extraer la primera parte del email antes del "@"
          const emailPrefix = this.email.split('@')[0];
          const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
          const nombreUsuario = `${emailPrefix}${numeroAleatorio}`;

          // 🔹 Actualizar perfil del usuario en Firebase Authentication
          return user.updateProfile({ displayName: nombreUsuario })
            .then(() => {
              console.log(`Usuario registrado con nombre automático: ${nombreUsuario}`);

              // 🔹 Guardar usuario en Firestore
              const userData = {
                uid: user.uid,
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                nombreUsuario: nombreUsuario
              };

              return this.db.addFirestoreDocument('users', userData)
                .then(() => console.log('Usuario guardado en Firestore'))
                .catch(err => console.error('Error guardando usuario:', err));
            });
        }
        return null;
      })
      .catch(err => console.error('Error en registro:', err));
      this.router.navigate(['/sign-in']);
  }
}
