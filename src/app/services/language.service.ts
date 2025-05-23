import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translateService: TranslateService) {}

  cargarIdioma() {
    const idioma = localStorage.getItem('idioma') || 'es'; // ✅ Cargar idioma guardado o español por defecto
    this.translateService.use(idioma); // ✅ Aplicar idioma global
  }

  cambiarIdioma(idioma: string) {
    this.translateService.use(idioma); // ✅ Cambiar idioma en tiempo real
    localStorage.setItem('idioma', idioma); // ✅ Guardar idioma en localStorage
  }
}
