import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  constructor(private afAuth: AngularFireAuth) {}

  registrar(email: string, password: string) {
  return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user) {
        // 🔹 Extraer la primera parte del correo antes del "@"
        const emailPrefix = email.split('@')[0];
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        const nombreUsuario = `${emailPrefix}${numeroAleatorio}`;

        // 🔹 Actualizar el perfil del usuario en Firebase Authentication
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
      .then(userCredential => userCredential.user)
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
  return this.afAuth.currentUser
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
  return this.afAuth.currentUser
    .then(user => {
      if (!user) {
        throw new Error('No hay un usuario autenticado.');
      }

      // 🔹 Enviar correo de verificación antes de cambiar el email
      return user.verifyBeforeUpdateEmail(nuevoCorreo)
        .then(() => console.log(`Correo de verificación enviado a ${nuevoCorreo}. El usuario debe confirmarlo.`))
        .catch(error => {
          console.error('Error al enviar correo de verificación:', error);
          return Promise.reject(error);
        });
    });
}


}
