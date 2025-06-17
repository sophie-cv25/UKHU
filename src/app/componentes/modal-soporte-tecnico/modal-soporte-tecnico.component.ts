import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-soporte-tecnico',
  templateUrl: './modal-soporte-tecnico.component.html',
  styleUrls: ['./modal-soporte-tecnico.component.scss'],
  standalone: false,
})
export class ModalSoporteTecnicoComponent {
  preguntaActiva: number | null = null;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService // ✅ Inyectar `TranslateService`
  ) {
    // ✅ Usar idioma almacenado o predeterminado
    this.translateService.use(localStorage.getItem('idioma') || 'es');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  mostrarRespuesta(indice: number) {
    this.preguntaActiva = this.preguntaActiva === indice ? null : indice;
  }
}
