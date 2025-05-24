import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
  ) {}

  registrar(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user) {
          const emailPrefix = email.split('@')[0];
          const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
          const nombreUsuario = `${emailPrefix}${numeroAleatorio}`;

          return user.updateProfile({ displayName: nombreUsuario })
            .then(() => {
              console.log(`Usuario registrado con nombre automático: ${nombreUsuario}`);
              return user;
            });
        }
        return null;
      })
      .catch(error => {
        console.error('Error en el registro:', error);
        throw error;
      });
  }

  iniciarSesion(email: string, password: string) {
  return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');  // Guardar estado de sesión
        localStorage.setItem('userData', JSON.stringify({
          email: user.email,
          nombre: user.displayName || email.split('@')[0] // Si no hay nombre, usar el email
        }));
        console.log('Sesión iniciada y datos guardados en localStorage.');
        return user;
      }
      return null;
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      throw error;
    });
}

  recuperarPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo de recuperación enviado.');
      })
      .catch(error => {
        console.error('Error al enviar el correo de recuperación:', error);
        throw error;
      });
  }

  cambiarContrasena(nuevaContrasena: string): Promise<void> {
    return this.afAuth.authState.pipe().toPromise()
      .then(user => {
        if (!user) {
          throw new Error('No hay un usuario autenticado.');
        }
        return user.updatePassword(nuevaContrasena);
      })
      .then(() => console.log('Contraseña actualizada con éxito'))
      .catch(error => console.error('Error al cambiar contraseña:', error));
  }

  cambiarCorreo(nuevoCorreo: string): Promise<void> {
    return this.afAuth.authState.pipe().toPromise()
      .then(user => {
        if (!user) {
          throw new Error('No hay un usuario autenticado.');
        }
        return user.verifyBeforeUpdateEmail(nuevoCorreo)
          .then(() => console.log(`Correo de verificación enviado a ${nuevoCorreo}.`))
          .catch(error => {
            console.error('Error al enviar correo de verificación:', error);
            return Promise.reject(error);
          });
      });
  }

  isLoggedIn(): Promise<boolean> {
  return this.afAuth.authState.pipe().toPromise().then(user => !!user);
}

  //  Generar código y enviarlo por email (SIN Firestore)
  enviarCodigoPorEmail(email: string, codigo: string) {
  const emailData = {
    to: email,
    subject: "Código de verificación",
    body: `Tu código de acceso es: ${codigo}`
  };

  return this.http.post('https://tu-servidor-email.com/send', emailData).toPromise()
    .then(() => console.log(`Correo enviado con código ${codigo}`))
    .catch(error => console.error('Error al enviar el correo:', error));
}


}
