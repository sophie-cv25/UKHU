import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalSoporteTecnicoComponent } from '../../componentes/modal-soporte-tecnico/modal-soporte-tecnico.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: false
})
export class ConfiguracionPage {
  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  async abrirSoporteTecnico() {
    const modal = await this.modalCtrl.create({
      component: ModalSoporteTecnicoComponent,
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      cssClass: 'modal-soporte-sheet'
    });
    await modal.present();
  }

  abrirPreferencias() {
    this.router.navigate(['/preferencias']);
  }
}