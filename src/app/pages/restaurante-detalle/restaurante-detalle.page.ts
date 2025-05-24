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
          // Incluye el id en el objeto restaurante
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
          id: this.restaurante.id
        }
      });
    }
  }

    goBack() {
    this.location.back();
  }

   async abrirModalCodigo() {
  // Verifica si el usuario está logueado usando localStorage
  const isLoggedRaw = localStorage.getItem('isLoggedIn');
  const isLogged = isLoggedRaw === 'true'; // Validación sencilla

  if (!isLogged) {
    console.log('⚠️ Usuario NO logueado');
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: 'Necesitas iniciar sesión para poder ingresar el código',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  // Verifica si hay un restaurante seleccionado
  if (!this.restaurante || !this.restaurante.id || !this.restaurante.nombre) {
    console.error('❌ Error: No se encontró la información del restaurante.');
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se encontró información del restaurante.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  console.log(`✅ Restaurante seleccionado: ${this.restaurante.nombre}, ID: ${this.restaurante.id}`);

  // Obtener datos del usuario desde localStorage
  const userDataRaw = localStorage.getItem('userData');
  console.log('🔎 Revisando userData en localStorage:', userDataRaw);

  if (!userDataRaw) {
    console.error('❌ Error: No se encontró userData en localStorage.');
    return;
  }

  const userData = JSON.parse(userDataRaw);
  const usuarioId = userData.id || ''; // ✅ Obtener el ID correcto del usuario
  const usuarioEmail = userData.email || '';
  const usuarioNombre = userData.nombre || '';

  console.log(`✅ Usuario logueado: ${usuarioNombre}, ID: ${usuarioId}, Email: ${usuarioEmail}`);

  if (!usuarioId) {
    console.error('❌ Error: No se encontró el ID del usuario en userData.');
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se encontró información del usuario.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  // Crear el modal pasando los datos correctos
  console.log('🛠️ Creando modal con datos:', {
    restauranteId: this.restaurante.id,
    nombreRestaurante: this.restaurante.nombre,
    usuarioId: usuarioId,
    usuarioEmail: usuarioEmail,
    usuarioNombre: usuarioNombre
  });

  const modal = await this.modalCtrl.create({
    component: CodigoModalComponent,
    componentProps: {
      restauranteId: this.restaurante.id,   // ✅ Pasamos el ID correcto del restaurante
      nombreRestaurante: this.restaurante.nombre, // ✅ Pasamos el nombre correcto del restaurante
      usuarioId: usuarioId, // ✅ Pasamos el ID correcto del usuario
      usuarioEmail: usuarioEmail,
      usuarioNombre: usuarioNombre
    },
    backdropDismiss: false
  });

  await modal.present();

  // Cierra el modal después de 5 minutos (300000 ms)
  const timeout = setTimeout(() => {
    modal.dismiss(null, 'timeout');
  }, 300000);

  const { data, role } = await modal.onWillDismiss();
  clearTimeout(timeout);

  if (data && role !== 'timeout') {
    console.log('📌 Código ingresado:', data);
  }
}

}
