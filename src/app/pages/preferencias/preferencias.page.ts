import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service'; 
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
  standalone:false
})
export class PreferenciasPage implements OnInit {
    userData: any;
  idioma: string = 'es';

  constructor(private languageService: LanguageService,private translateService: TranslateService) {} 

  ngOnInit() {
      this.idioma = localStorage.getItem('idioma') || 'es';
    this.translateService.use(this.idioma);
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
