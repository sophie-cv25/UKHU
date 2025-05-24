import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
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
  iconosPerfil: string[] = [
    'Perfilnegro.svg',
    'Perfilplomo.svg',
    'Perfilrosa.svg',
    'Perfilrosao.svg'
  ];
  iconoSeleccionado: number = 0;

  constructor(private dbService: DatabaseService, private authService: AuthserviceService) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      if (this.userData.iconoPerfil) {
        const idx = this.iconosPerfil.indexOf(this.userData.iconoPerfil);
        this.iconoSeleccionado = idx !== -1 ? idx : 0;
      }
    } else {
      this.userData = {};
    }
  }

  anteriorIcono() {
    this.iconoSeleccionado = (this.iconoSeleccionado - 1 + this.iconosPerfil.length) % this.iconosPerfil.length;
  }

  siguienteIcono() {
    this.iconoSeleccionado = (this.iconoSeleccionado + 1) % this.iconosPerfil.length;
  }

  guardarIconoSeleccionado() {
    this.userData.iconoPerfil = this.iconosPerfil[this.iconoSeleccionado];
    localStorage.setItem('userData', JSON.stringify(this.userData));
    // Opcional: notificación visual
    // alert('Icono de perfil actualizado.');
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
    // No se sube el iconoPerfil a Firebase

    if (Object.keys(updatedData).length === 0) {
      console.log('No se realizaron cambios en el perfil.');
      return;
    }

    if (updatedData.email) {
      this.authService.cambiarCorreo(updatedData.email)
        .then(() => {
          alert(`Se ha enviado un correo de verificación a ${updatedData.email}. Debes confirmar el cambio antes de que se actualice en la aplicación.`);
          this.actualizarCorreoEnFirestore(userData.uid, updatedData.email);
        })
        .catch(error => {
          console.error('Error al actualizar correo en Firebase Authentication:', error);
        });
    } else {
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

