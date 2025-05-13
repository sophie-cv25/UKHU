import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  constructor(private afAuth: AngularFireAuth) {}

  registrar(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => userCredential.user)
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
  
}
