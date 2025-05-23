import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  userData: any;
  idioma: string = 'es'; //  Idioma por defecto

  constructor(private router: Router, private translateService: TranslateService, private languageService: LanguageService) {}


  ngOnInit() {
    // Recuperar datos de localStorage al cargar la página
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('Datos del usuario cargados en Perfil:', this.userData);
    } else {
      console.error('No hay datos del usuario en localStorage.');
    }

    //  Cargar el idioma guardado o establecer español por defecto
    this.idioma = localStorage.getItem('idioma') || 'es';
    this.translateService.use(this.idioma);
  }

  cerrarSesion() {
    localStorage.clear(); // Borra todos los datos del usuario en localStorage
    console.log('Sesión cerrada. Se eliminaron los datos de localStorage.');
    this.router.navigate(['/sign-in']); // Redirige a la pantalla de inicio de sesión correctamente
  }

  cambiarIdioma(event: any) {
  const idiomaSeleccionado = event.detail?.value; // ✅ Extraer el valor correctamente

  if (idiomaSeleccionado) {
    this.idioma = idiomaSeleccionado;
    this.languageService.cambiarIdioma(this.idioma); // ✅ Aplicar el idioma en el servicio
    console.log('Idioma cambiado a:', this.idioma); // 🔹 Depuración en consola
  } else {
    console.error('No se pudo obtener el idioma seleccionado. Evento recibido:', event);
  }
}



}
