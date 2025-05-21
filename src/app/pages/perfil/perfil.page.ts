import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  userData: any;

  constructor(private router: Router) {} // ✅ Se inyecta correctamente el Router

  ngOnInit() {
    // Recuperar datos de localStorage al cargar la página
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('Datos del usuario cargados en Perfil:', this.userData);
    } else {
      console.error('No hay datos del usuario en localStorage.');
    }
  }

  cerrarSesion() {
    localStorage.clear(); // Borra todos los datos del usuario en localStorage
    console.log('Sesión cerrada. Se eliminaron los datos de localStorage.');
    this.router.navigate(['/sign-in']); // ✅ Redirige a la pantalla de inicio de sesión correctamente
  }
}
