import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-editar-local',
  templateUrl: './editar-local.page.html',
  styleUrls: ['./editar-local.page.scss'],
  standalone: false
})
export class EditarLocalPage implements OnInit {
  userData: any = {};

  constructor(private dbService: DatabaseService, private authService: AuthserviceService) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);

      // 🔹 Asegurar que `horarioAtencion` tenga la estructura correcta con valores de tipo `string`
      if (!this.userData.horarioAtencion || typeof this.userData.horarioAtencion !== 'object') {
        this.userData.horarioAtencion = { apertura: '', cierre: '' };
      } else {
        this.userData.horarioAtencion.apertura = this.userData.horarioAtencion.apertura || '';
        this.userData.horarioAtencion.cierre = this.userData.horarioAtencion.cierre || '';
      }
    } else {
      console.error('No hay datos del usuario en localStorage.');
    }

    console.log('HorarioAtencion cargado:', this.userData.horarioAtencion); // 🔹 Verificar datos en consola
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

    if (userData.mail?.trim() && userData.mail !== this.userData.mail) {
      updatedData.mail = this.userData.mail;
    }
    if (userData.referencia?.trim() && userData.referencia !== this.userData.referencia) {
      updatedData.referencia = this.userData.referencia;
    }
    if (userData.descripcion?.trim() && userData.descripcion !== this.userData.descripcion) {
      updatedData.descripcion = this.userData.descripcion;
    }
    if (userData.horarioAtencion && JSON.stringify(userData.horarioAtencion) !== JSON.stringify(this.userData.horarioAtencion)) {
      updatedData.horarioAtencion = this.userData.horarioAtencion;
    }

    if (Object.keys(updatedData).length === 0) {
      console.log('No se realizaron cambios.');
      return;
    }

    if (updatedData.mail) {
      this.authService.cambiarCorreo(updatedData.mail)
        .then(() => {
          console.log('Correo actualizado en Firebase Authentication');
          alert(`Se ha enviado un correo de verificación a ${updatedData.mail}. Debes confirmar el cambio antes de que se actualice en la aplicación.`);
          this.actualizarCorreoEnFirestore(userData.uid, updatedData.mail);
        })
        .catch(error => {
          console.error('Error al actualizar correo en Firebase Authentication:', error);
        });
    } else {
      this.actualizarUsuarioEnFirestore(userData.uid, updatedData);
    }
  }

  actualizarCorreoEnFirestore(uid: string, nuevoCorreo: string) {
    this.dbService.getCollectionByCustomparam('restaurantes', 'uid', uid).pipe(take(1)).subscribe(userArray => {
      if (!userArray || userArray.length === 0) {
        console.error('Error: No se encontró el documento en Firestore.');
        return;
      }

      const userDoc = userArray[0];

      this.dbService.updateFireStoreDocument('restaurantes', userDoc.id, { mail: nuevoCorreo })
        .then(() => {
          console.log('Correo actualizado en Firestore');
          this.actualizarLocalStorage(uid, { mail: nuevoCorreo });
        })
        .catch(error => console.error('Error al actualizar correo en Firestore:', error));
    });
  }

  actualizarUsuarioEnFirestore(uid: string, updatedData: any) {
    this.dbService.getCollectionByCustomparam('restaurantes', 'uid', uid).pipe(take(1)).subscribe(userArray => {
      if (!userArray || userArray.length === 0) {
        console.error('Error: No se encontró el documento en Firestore.');
        return;
      }

      const userDoc = userArray[0];

      this.dbService.updateFireStoreDocument('restaurantes', userDoc.id, updatedData)
        .then(() => {
          console.log('Datos del usuario actualizados en Firestore');
          this.actualizarLocalStorage(uid, updatedData);
        })
        .catch(error => console.error('Error al actualizar datos del usuario:', error));
    });
  }

  actualizarLocalStorage(uid: string, updatedData: any) {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) return;

    const userData = JSON.parse(storedUserData);
    localStorage.setItem('userData', JSON.stringify({ ...userData, ...updatedData }));
  }
}
