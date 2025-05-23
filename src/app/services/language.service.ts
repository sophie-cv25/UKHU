import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  cargarIdioma() {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    this.translate.setDefaultLang(idiomaGuardado);
    this.translate.use(idiomaGuardado); // ✅ Aplicar el idioma guardado
  }

  cambiarIdioma(idioma: string) {
    this.translate.setDefaultLang(idioma);
    this.translate.use(idioma);
    localStorage.setItem('idioma', idioma); // ✅ Guarda el idioma seleccionado
  }
}
