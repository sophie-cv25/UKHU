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
  
  // 
  this.guardarCambios();
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
    let huboCambio = false;

    // 🔹 Detectar cambios en los datos del usuario
    if (userData.email?.trim() && userData.email !== this.userData.email) {
      updatedData.email = this.userData.email;
      huboCambio = true;
    }
    if (userData.nombre?.trim() && userData.nombre !== this.userData.nombre) {
      updatedData.nombre = this.userData.nombre;
      huboCambio = true;
    }
    if (userData.nombreUsuario?.trim() && userData.nombreUsuario !== this.userData.nombreUsuario) {
      updatedData.nombreUsuario = this.userData.nombreUsuario;
      huboCambio = true;
    }

    // 🔹 Detectar si el icono fue cambiado
    if (this.userData.iconoPerfil && this.userData.iconoPerfil !== userData.icono) {
      updatedData.icono = this.userData.iconoPerfil;
      huboCambio = true;
    }

    // 🔹 Si no hubo cambios, no enviamos la actualización
    if (!huboCambio) {
      console.log('No se realizaron cambios en el perfil.');
      return;
    }

    this.actualizarPerfilEnFirestore(userData.uid, updatedData);
  }

  actualizarPerfilEnFirestore(uid: string, updatedData: any) {
    this.dbService.getCollectionByCustomparam('users', 'uid', uid).pipe(take(1)).subscribe(userDataArray => {
      if (!userDataArray || userDataArray.length === 0) {
        console.error('Error: No se encontró el documento en Firestore.');
        return;
      }
      const userDoc = userDataArray[0];

      // 🔹 Verificar si el campo `icono` ya existe en el documento de Firebase
      if ('icono' in userDoc && updatedData.icono === userDoc.icono) {
        console.log("El campo 'icono' ya existe y no ha cambiado, no se realizan actualizaciones.");
        return; // 🔹 Si ya existe y es el mismo, no hacemos nada
      }

      this.dbService.updateFireStoreDocument('users', userDoc.id, updatedData)
        .then(() => {
          console.log("Perfil actualizado correctamente en Firestore.");
          this.actualizarLocalStorage(uid, updatedData);
        })
        .catch(error => console.error("Error al actualizar perfil en Firestore:", error));
    });
  }

  actualizarLocalStorage(uid: string, updatedData: any) {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) return;
    const userData = JSON.parse(storedUserData);
    localStorage.setItem('userData', JSON.stringify({ ...userData, ...updatedData }));
  }
}
