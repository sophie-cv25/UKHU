import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-gamificacion',
  templateUrl: './gamificacion.page.html',
  styleUrls: ['./gamificacion.page.scss'],
  standalone:false
})
export class GamificacionPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }
 // Método para redirigir a la página de Misiones
  goToMissions() {
    this.navController.navigateForward('/misiones'); // Reemplaza '/misiones' con la ruta real de tu página de misiones
  }

  // Método para redirigir a la página de Recompensas
  goToRewards() {
    this.navController.navigateForward('/recompensas'); // Reemplaza '/recompensas' con la ruta real de tu página de recompensas
  }

  // Puedes añadir un método para la notificación si lo necesitas
  showNotifications() {
    // Lógica para mostrar notificaciones o navegar a una página de notificaciones
    console.log('Notificaciones clicadas!');
    // this.navController.navigateForward('/notificaciones');
  }
}
