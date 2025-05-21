import { Component, OnInit } from '@angular/core';
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

  constructor(private dbService: DatabaseService) {} 

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

  // Obtener documento por UID desde Firestore con `take(1)` para evitar el bucle infinito
  this.dbService.getCollectionByCustomparam('users', 'uid', userData.uid).pipe(take(1)).subscribe(userDataArray => {
    if (!userDataArray || userDataArray.length === 0) {
      console.error('Error: No se encontró el documento en Firestore.');
      return;
    }

    const userDoc = userDataArray[0]; 

    // Actualizar datos en Firestore
    this.dbService.updateFireStoreDocument('users', userDoc.id, updatedData)
      .then(() => {
        console.log('Perfil actualizado en Firestore');
        localStorage.setItem('userData', JSON.stringify({ ...userData, ...updatedData }));
      })
      .catch(error => console.error('Error al actualizar perfil en Firestore:', error));
  });
}


}
