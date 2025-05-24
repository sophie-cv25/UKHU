import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-local',
  templateUrl: './menu-local.page.html',
  styleUrls: ['./menu-local.page.scss'],
  standalone: false
})
export class MenuLocalPage implements OnInit {
  userData: any = {};
  menu: any[] = []; // 🔹 Ahora `menu` es un array

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private location: Location,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    } else {
      console.error('No hay datos del usuario en localStorage.');
      return;
    }

    this.cargarMenu();
  }

  cargarMenu() {
    this.databaseService.getCollectionByCustomparam('restaurantes', 'uid', this.userData.uid).subscribe(restaurantes => {
      if (restaurantes && restaurantes.length > 0) {
        const restauranteDoc = restaurantes[0];
        this.menu = Object.values(restauranteDoc.menu || {}); // 🔹 Convertimos el mapa a un array
      } else {
        console.error('No se encontró el restaurante en Firestore.');
      }
    });
  }

  agregarPlatillo() {
    const nuevoPlatillo = {
      nombre: 'Nuevo Platillo',
      descripcion: 'Descripción aquí',
      imagen: '',
      precio: 0
    };
    this.menu.push(nuevoPlatillo);
    this.actualizarMenuEnFirestore();
  }

  async eliminarPlatillo(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar el platillo "${this.menu[index]?.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.menu.splice(index, 1); // 🔹 Elimina por índice
            this.actualizarMenuEnFirestore();
          }
        }
      ]
    });
    await alert.present();
  }

  actualizarMenuEnFirestore() {
    this.databaseService.updateFireStoreDocument('restaurantes', this.userData.uid, { menu: this.menu })
      .then(() => console.log('Menú actualizado en Firestore'))
      .catch(error => console.error('Error al actualizar menú:', error));
  }
  

  goBack() {
    this.location.back();
  }
  guardarPlatillo() {
  this.actualizarMenuEnFirestore();
}

}
