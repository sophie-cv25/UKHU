import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service'; // ✅ Asegurar que la importación es correcta
import { DatabaseService } from 'src/app/services/database.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-perfilc',
  templateUrl: './edit-perfilc.page.html',
  styleUrls: ['./edit-perfilc.page.scss'],
  standalone: false
})
export class EditPerfilcPage implements OnInit {
  userData: any = {}; 

  constructor(private dbService: DatabaseService, private authService: AuthserviceService) {} // ✅ Inyectar `AuthserviceService`

  ngOnInit() {
    // Recuperar datos de localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    } else {
      console.error('No hay datos del usuario en localStorage.');
    }
  }

  guardarCambios() {
  const storedUserData = localStorage.getItem('userData');
  if (!storedUserData) {
    console.error('No se encontraron datos del usuario en localStorage.');
    return;
  }

  const userData = JSON.parse(storedUserData);
  if (!userData.uid) {
    console.error('No se pudo actualizar: falta el UID del usuario.');
    return;
  }

  const updatedData: any = {};

  if (userData.email?.trim() && userData.email !== this.userData.email) {
    updatedData.email = this.userData.email;
  }
  if (userData.nombre?.trim() && userData.nombre !== this.userData.nombre) {
    updatedData.nombre = this.userData.nombre;
  }
  if (userData.nombreUsuario?.trim() && userData.nombreUsuario !== this.userData.nombreUsuario) {
    updatedData.nombreUsuario = this.userData.nombreUsuario;
  }

  if (Object.keys(updatedData).length === 0) {
    console.log('No se realizaron cambios en el perfil.');
    return;
  }

  // 🔹 Si el usuario quiere cambiar su email, actualizar en Firebase Authentication primero
  if (updatedData.email) {
    this.authService.cambiarCorreo(updatedData.email)
      .then(() => {
        console.log('Correo actualizado en Firebase Authentication');
        alert(`Se ha enviado un correo de verificación a ${updatedData.email}. Debes confirmar el cambio antes de que se actualice en la aplicación.`);

        // 🔹 Una vez confirmado el cambio, actualizar el correo en Firestore
        this.actualizarCorreoEnFirestore(userData.uid, updatedData.email);
      })
      .catch(error => {
        console.error('Error al actualizar correo en Firebase Authentication:', error);
      });
  } else {
    // 🔹 Si no se cambió el correo, actualizar Firestore directamente
    this.actualizarPerfilEnFirestore(userData.uid, updatedData);
  }
}

actualizarCorreoEnFirestore(uid: string, nuevoCorreo: string) {
  this.dbService.getCollectionByCustomparam('users', 'uid', uid).pipe(take(1)).subscribe(userDataArray => {
    if (!userDataArray || userDataArray.length === 0) {
      console.error('Error: No se encontró el documento en Firestore.');
      return;
    }

    const userDoc = userDataArray[0];

    this.dbService.updateFireStoreDocument('users', userDoc.id, { email: nuevoCorreo })
      .then(() => {
        console.log('Correo actualizado en Firestore');
        this.actualizarLocalStorage(uid, { email: nuevoCorreo });
      })
      .catch(error => console.error('Error al actualizar correo en Firestore:', error));
  });
}

actualizarPerfilEnFirestore(uid: string, updatedData: any) {
  this.dbService.getCollectionByCustomparam('users', 'uid', uid).pipe(take(1)).subscribe(userDataArray => {
    if (!userDataArray || userDataArray.length === 0) {
      console.error('Error: No se encontró el documento en Firestore.');
      return;
    }

    const userDoc = userDataArray[0];

    this.dbService.updateFireStoreDocument('users', userDoc.id, updatedData)
      .then(() => {
        console.log('Perfil actualizado en Firestore');
        this.actualizarLocalStorage(uid, updatedData);
      })
      .catch(error => console.error('Error al actualizar perfil en Firestore:', error));
  });
}

actualizarLocalStorage(uid: string, updatedData: any) {
  const storedUserData = localStorage.getItem('userData');
  if (!storedUserData) return;

  const userData = JSON.parse(storedUserData);
  localStorage.setItem('userData', JSON.stringify({ ...userData, ...updatedData }));
}

}
