
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
  userData: any = {};
  idioma: string = 'es';

  constructor(private router: Router, private translateService: TranslateService, private languageService: LanguageService) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    } else {
      this.userData = {};
    }
    this.idioma = localStorage.getItem('idioma') || 'es';
    this.translateService.use(this.idioma);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
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
