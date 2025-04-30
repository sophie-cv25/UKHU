import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service'; // Adjust the path as needed

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isActionSheetOpen = false;
  ActionSheetButtons = []
  constructor(
    public db: DatabaseService,
    public modal: ModalController
  ) {
    this.db.addFirestoreDocument('users', {
      name: 'Juanito',
      email: 'juanito@gmail.com',
      password: 123456,
      phone: 123456789,
  }).then((res) => {
    console.log('Usuario creado', res.id);
  } ).catch((err) => {
    console.log('Error al crear el usuario', err);
  } );

}
}
