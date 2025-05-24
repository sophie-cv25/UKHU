import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { CodigoModalComponent } from 'src/app/componentes/codigo-modal/codigo-modal.component';
import { AlertController } from '@ionic/angular/standalone';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.page.html',
  styleUrls: ['./restaurante-detalle.page.scss'],
  standalone: false
})
export class RestauranteDetallePage implements OnInit {
  restaurante: any;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router,
    private location: Location,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthserviceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.databaseService.getDocumentById('restaurantes', id).subscribe((doc) => {
        if (doc.payload.exists) {
          this.restaurante = { id, ...doc.payload.data() };
        }
      });
    }
  }

  comoLlegar() {
    if (this.restaurante?.latitud && this.restaurante?.longitud && this.restaurante?.id) {
      this.router.navigate(['/buscar'], {
        queryParams: {
          latitud: this.restaurante.latitud,
          longitud: this.restaurante.longitud,
          id: this.restaurante.id,
          abrirCodigo: 1,
          nombreRestaurante: this.restaurante.nombre
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

   async abrirModalCodigo() {
  const isLoggedRaw = localStorage.getItem('isLoggedIn');
  const isLogged = isLoggedRaw === 'true';

  if (!isLogged) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: 'Necesitas iniciar sesión para poder ingresar el código',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  if (!this.restaurante || !this.restaurante.id || !this.restaurante.nombre) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se encontró información del restaurante.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  const userDataRaw = localStorage.getItem('userData');
  if (!userDataRaw) {
    return;
  }
  const userData = JSON.parse(userDataRaw);
  const usuarioId = userData.id || '';
  const usuarioEmail = userData.email || '';
  const usuarioNombre = userData.nombre || '';
  if (!usuarioId) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se encontró información del usuario.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }
  const modal = await this.modalCtrl.create({
    component: CodigoModalComponent,
    componentProps: {
      restauranteId: this.restaurante.id,
      nombreRestaurante: this.restaurante.nombre,
      usuarioId: usuarioId,
      usuarioEmail: usuarioEmail,
      usuarioNombre: usuarioNombre
    },
    backdropDismiss: false
  });
  await modal.present();
  const timeout = setTimeout(() => {
    modal.dismiss(null, 'timeout');
  }, 300000);
  const { data, role } = await modal.onWillDismiss();
  clearTimeout(timeout);
  if (data && role !== 'timeout') {
    // Aquí puedes manejar data si necesitas
  }
}
}