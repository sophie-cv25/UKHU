import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ranking-modal',
  templateUrl: './ranking-modal.component.html',
  styleUrls: ['./ranking-modal.component.scss'],
  standalone: false,
})
export class RankingModalComponent implements OnInit {
  restauranteId: string = '';
  nombreRestaurante: string = '';
  usuarioId: string = '';
  calificacionSeleccionada: number = 0;  // ✅ Ahora inicia con 0 en lugar de null


  constructor(private modalCtrl: ModalController, private databaseService: DatabaseService, private navParams: NavParams) {}

  ngOnInit() {
    this.restauranteId = this.navParams.get('restauranteId');
    this.nombreRestaurante = this.navParams.get('nombreRestaurante');
    this.usuarioId = this.navParams.get('usuarioId');

    console.log(`✅ Ranking abierto para ${this.nombreRestaurante}, Usuario: ${this.usuarioId}`);
  }

  seleccionarCalificacion(calificacion: number) {
    this.calificacionSeleccionada = calificacion;
  }

  async enviarRanking() {
    if (!this.calificacionSeleccionada) {
      alert('Debes seleccionar una calificación antes de enviar.');
      return;
    }

    console.log(`✅ Enviando ranking: ${this.calificacionSeleccionada} estrellas para ${this.nombreRestaurante}`);

    this.databaseService.guardarRankingRestaurante(this.usuarioId, this.restauranteId, this.calificacionSeleccionada);
    
    alert('¡Gracias por tu ranking!');
    this.modalCtrl.dismiss(); // 📌 Ahora sí podemos cerrar el modal
  }
}
