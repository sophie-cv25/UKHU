import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-forgot-pasword', // Se mantiene el decorador sin cambios
  templateUrl: './forgot-pasword.page.html',
  styleUrls: ['./forgot-pasword.page.scss'],
  standalone:false,
})
export class ForgotPaswordPage implements OnInit {
  email: string = ''; // ✅ Se declara email para evitar errores

  constructor(private authService: AuthserviceService) {}

  recuperarPassword() {
    if (!this.email) {
      console.error('Por favor, ingresa tu correo electrónico.');
      return;
    }

    this.authService.recuperarPassword(this.email)
      .then(() => {
        console.log('Correo de recuperación enviado.');
      })
      .catch(err => console.error('Error al enviar correo de recuperación:', err));
  }

  ngOnInit() {}
}
