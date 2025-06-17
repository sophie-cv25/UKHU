import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gamificacion',
  templateUrl: './gamificacion.page.html',
  styleUrls: ['./gamificacion.page.scss'],
  standalone: false
})
export class GamificacionPage implements OnInit {
  usuarioId: string = '';
  userData: any = {};
  historial: any[] = [];
  locales: number = 0;
  puntos: number = 0;

  constructor(
    private navController: NavController,
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ✅ Extraer userData desde localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('📦 LocalStorage - Datos completos del usuario:', this.userData);
      this.usuarioId = this.userData.id || '';
    } else {
      this.userData = {};
      console.log('⚠️ No se encontraron datos de usuario en LocalStorage.');
    }

    if (this.usuarioId) {
  this.databaseService.getHistorialDeUsuario(this.usuarioId).subscribe(data => {
    console.log('✅ Historial extraído:', data);
    this.historial = data;

    this.locales = this.historial.length; // Contamos los elementos en el historial
    this.puntos = this.locales * 10; // Calculamos los puntos

    // ✅ Guardar valores en `localStorage`
    localStorage.setItem('locales', JSON.stringify(this.locales));
    localStorage.setItem('puntos', JSON.stringify(this.puntos));

    this.cdr.detectChanges();
    console.log('🔢 Total de registros:', this.locales);
    console.log('⭐ Puntos acumulados:', this.puntos);
  });
}


    // ✅ Cargar puntos desde `localStorage`
    const puntosGuardados = localStorage.getItem('puntos');
    if (puntosGuardados) {
      this.puntos = JSON.parse(puntosGuardados);
      console.log('📦 LocalStorage - puntos recuperados:', this.puntos);
    }
  }

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
