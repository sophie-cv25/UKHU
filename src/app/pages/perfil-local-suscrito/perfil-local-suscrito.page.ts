import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-perfil-local-suscrito',
  templateUrl: './perfil-local-suscrito.page.html',
  styleUrls: ['./perfil-local-suscrito.page.scss'],
  standalone: false
})
export class PerfilLocalSuscritoPage implements OnInit, ViewWillEnter {
  nombreLocal = '';
  emailLocal = '';
  referencia = '';
  descripcion = '';
  horarioApertura = '';
  horarioCierre = '';
  imageLink = '';
  userData: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const datos = JSON.parse(storedUserData);
      this.userData = datos;
      this.nombreLocal = datos.nombre || 'No disponible';
      this.emailLocal = datos.mail || 'No disponible';
      this.referencia = datos.referencia || 'No disponible';
      this.descripcion = datos.descripcion || 'No disponible';
      this.imageLink = datos.imageLink || '';
      if (datos.horarioAtencion) {
        this.horarioApertura = datos.horarioAtencion.apertura || 'No especificado';
        this.horarioCierre = datos.horarioAtencion.cierre || 'No especificado';
      } else {
        this.horarioApertura = 'No especificado';
        this.horarioCierre = 'No especificado';
      }
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }
}