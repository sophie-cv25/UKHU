import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NavParams } from '@ionic/angular';
import { RankingModalComponent } from '../ranking-modal/ranking-modal.component';

@Component({
  selector: 'app-codigo-modal',
  templateUrl: './codigo-modal.component.html',
  styleUrls: ['./codigo-modal.component.scss'],
  standalone: false,
})
export class CodigoModalComponent implements OnInit {
  codigoDigits: string[] = ["", "", "", "", ""]; // Para 5 dígitos
  codigo: string = '';
  codigoGenerado: string = '';
  tiempoRestante: number = 300;
  timerInterval: any;
  usuarioId: string = '';
  usuarioEmail: string = '';
  usuarioNombre: string = '';
  restauranteId: string = '';
  nombreRestaurante: string = '';

  constructor(
    private modalCtrl: ModalController,
    private databaseService: DatabaseService,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    // Recibe los datos del modal
    this.usuarioId = this.navParams.get('usuarioId');
    this.usuarioEmail = this.navParams.get('usuarioEmail');
    this.usuarioNombre = this.navParams.get('usuarioNombre');
    this.restauranteId = this.navParams.get('restauranteId');
    this.nombreRestaurante = this.navParams.get('nombreRestaurante');
    this.generateCode();
  }

  onDigitInput(event: any, idx: number) {
    const value = event.target.value;
    if (value.length > 1) {
      this.codigoDigits[idx] = value.slice(0, 1);
    }
    // Mover al siguiente input si escribe
    if (value && idx < 4) {
      const next = document.querySelectorAll('.codigo-digit')[idx + 1] as HTMLInputElement;
      if (next) next.focus();
    }
    // Actualiza el código completo
    this.codigo = this.codigoDigits.join('');
  }

  generateCode(): void {
    // Genera código de 5 caracteres
    this.codigoGenerado = Math.random().toString(36).substring(2, 7).toUpperCase();
    const timestamp = Date.now();
    localStorage.setItem('codigoTemporal', JSON.stringify({ codigo: this.codigoGenerado, timestamp }));
    this.startExpirationTimer();
  }

  startExpirationTimer(): void {
    this.timerInterval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem('codigoTemporal') || '{}');
      if (!storedData.timestamp) {
        clearInterval(this.timerInterval);
        return;
      }
      const elapsedTime = (Date.now() - storedData.timestamp) / 1000;
      this.tiempoRestante = Math.max(0, 300 - elapsedTime);

      if (this.tiempoRestante === 0) {
        localStorage.removeItem('codigoTemporal');
        clearInterval(this.timerInterval);
        alert('El código ha expirado. Solicita uno nuevo.');
      }
    }, 1000);
  }

  validateCode(): void {
    const storedData = JSON.parse(localStorage.getItem('codigoTemporal') || '{}');
    if (!storedData.codigo || !storedData.timestamp) {
      alert('No hay un código activo.');
      return;
    }
    if (this.tiempoRestante <= 0) {
      alert('El código ha expirado. Solicita uno nuevo.');
      return;
    }
    if (this.codigo === storedData.codigo) {
      this.databaseService.saveCodigoUsado(this.codigo, this.usuarioEmail, this.usuarioNombre, this.restauranteId, this.nombreRestaurante);
      this.databaseService.saveHistorialVisita(this.usuarioId, this.restauranteId, this.nombreRestaurante);
      localStorage.removeItem('codigoTemporal');
      clearInterval(this.timerInterval);
      alert('Código validado correctamente. ¡Gracias por tu visita!');
      this.modalCtrl.dismiss();
      
      this.abrirRankingModal();

    } else {
      alert('Código incorrecto. Intenta nuevamente.');
    }
  }
  async abrirRankingModal() {
    console.log(`🎯 Abriendo ranking para ${this.nombreRestaurante}, Usuario: ${this.usuarioNombre}`);

    const modal = await this.modalCtrl.create({
      component: RankingModalComponent,  // ✅ Ahora usamos `RankingModalComponent`
      componentProps: {
        restauranteId: this.restauranteId,
        nombreRestaurante: this.nombreRestaurante,
        usuarioId: this.usuarioId
      },
      backdropDismiss: false  // Bloquear cierre sin rankear
    });

    await modal.present();
  }

  // Si tienes lógica para destruir el modal o limpiar intervalos:
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}