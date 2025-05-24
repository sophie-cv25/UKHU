import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-codigo-modal',
  templateUrl: './codigo-modal.component.html',
  styleUrls: ['./codigo-modal.component.scss'],
  standalone: false,
})
export class CodigoModalComponent implements OnInit {
  codigo: string = '';
  codigoGenerado: string = '';
  tiempoRestante: number = 300;
  timerInterval: any;
  usuarioId: string = '';  // ✅ Agregamos `usuarioId` explícitamente
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
    console.log('🔎 Recibiendo datos en el modal desde `RestauranteDetallePage`:', this.navParams.data);

    this.usuarioId = this.navParams.get('usuarioId');  // ✅ Recibe el ID correcto del usuario
    this.usuarioEmail = this.navParams.get('usuarioEmail');
    this.usuarioNombre = this.navParams.get('usuarioNombre');
    this.restauranteId = this.navParams.get('restauranteId');
    this.nombreRestaurante = this.navParams.get('nombreRestaurante');

    console.log(`✅ Datos del usuario en el modal: ID: ${this.usuarioId}, Nombre: ${this.usuarioNombre}, Email: ${this.usuarioEmail}`);
    console.log(`✅ Restaurante seleccionado en el modal: ID: ${this.restauranteId}, Nombre: ${this.nombreRestaurante}`);

    this.generateCode(); // Generar código al abrir el modal
  }

  onInput(event: any): void {
    this.codigo = this.codigo.slice(0, 8);
  }

  generateCode(): void {
    this.codigoGenerado = Math.random().toString(36).substring(2, 10).toUpperCase();
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
    console.log('📌 Validando código ingresado:', this.codigo);

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
      console.log(`✅ Código correcto. Guardando historial en el usuario: ${this.usuarioId}`);

      this.databaseService.saveCodigoUsado(this.codigo, this.usuarioEmail, this.usuarioNombre, this.restauranteId, this.nombreRestaurante);
      this.databaseService.saveHistorialVisita(this.usuarioId, this.restauranteId, this.nombreRestaurante);

      localStorage.removeItem('codigoTemporal');
      clearInterval(this.timerInterval);
      alert('Código validado correctamente. ¡Gracias por tu visita!');
      this.modalCtrl.dismiss();
    } else {
      alert('Código incorrecto. Intenta nuevamente.');
    }
  }
}
