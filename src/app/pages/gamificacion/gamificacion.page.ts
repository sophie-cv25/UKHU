import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service'; // ✅ Importación correcta

@Component({
  selector: 'app-gamificacion',
  templateUrl: './gamificacion.page.html',
  styleUrls: ['./gamificacion.page.scss'],
  standalone: false
})
export class GamificacionPage implements OnInit {

  constructor(private navController: NavController, private databaseService: DatabaseService) {}  // ✅ Inyectamos `DatabaseService`

  ngOnInit() {}

  goToMissions() {
    this.navController.navigateForward('/misiones');
  }

  goToRewards() {
    this.navController.navigateForward('/recompensas');
  }

  showNotifications() {
    console.log('Notificaciones clicadas!');
  }

  agregarMision() {
    this.databaseService.addMision(
      'SEMANAL 2',
      'Come 5 platillos de diferentes restaurantes',
      50,
      'http://localhost:8100/assets/images/mis5.png',
      '12/06/2025'
    )
    .then(() => console.log('✅ Misión añadida correctamente'))
    .catch(error => console.error('❌ Error al añadir la misión:', error));
  }

}
