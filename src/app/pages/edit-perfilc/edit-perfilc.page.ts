import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private dbService: DatabaseService,
    private authService: AuthserviceService,
    private router: Router,
    private alertController: AlertController
  ) {}

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
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: '¿Confirmar cambios?',
      message: '¿Estás seguro/a de guardar los cambios?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.guardarCambios();
          }
        }
      ]
    });
    await alert.present();
  }

  guardarCambios() {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      console.error('No se encontraron datos del usuario en localStorage.');
      this.goToPerfilYRecargar();
      return;
    }
    const userData = JSON.parse(storedUserData);
    if (!userData.uid) {
      console.error('No se pudo actualizar: falta el UID del usuario.');
      this.goToPerfilYRecargar();
      return;
    }

    const updatedData: any = {};
    let huboCambio = false;

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
    if (this.userData.iconoPerfil && this.userData.iconoPerfil !== userData.icono) {
      updatedData.icono = this.userData.iconoPerfil;
      huboCambio = true;
    }

    if (!huboCambio) {
      this.goToPerfilYRecargar();
      return;
    }

    this.dbService.getCollectionByCustomparam('users', 'uid', userData.uid).pipe(take(1)).subscribe(userDataArray => {
      if (!userDataArray || userDataArray.length === 0) {
        console.error('Error: No se encontró el documento en Firestore.');
        this.goToPerfilYRecargar();
        return;
      }
      const userDoc = userDataArray[0];

      if ('icono' in userDoc && updatedData.icono === userDoc.icono) {
        this.goToPerfilYRecargar();
        return;
      }

      this.dbService.updateFireStoreDocument('users', userDoc.id, updatedData)
        .then(() => {
          this.actualizarLocalStorage(userData.uid, updatedData);
          this.goToPerfilYRecargar();
        })
        .catch(() => this.goToPerfilYRecargar());
    });
  }

  actualizarLocalStorage(uid: string, updatedData: any) {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) return;
    const userData = JSON.parse(storedUserData);
    localStorage.setItem('userData', JSON.stringify({ ...userData, ...updatedData }));
  }

  // Ir a perfil y recargar la página (FULL reload)
  goToPerfilYRecargar() {
    this.router.navigate(['/perfil']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }
}