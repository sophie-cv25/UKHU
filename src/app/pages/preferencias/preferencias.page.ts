import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
  standalone: false,
})
export class PreferenciasPage implements OnInit {
  userData: any;
  idioma: string = 'es';
  notificaciones: boolean = true; // Estado del toggle
  modoOscuro: boolean = false; // Estado del toggle

  constructor(
    private languageService: LanguageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idioma = localStorage.getItem('idioma') || 'es';
    this.translateService.use(this.idioma);
  }

  cambiarIdioma(event: any) {
    const idiomaSeleccionado = event.detail?.value;
    if (idiomaSeleccionado) {
      this.idioma = idiomaSeleccionado;
      this.languageService.cambiarIdioma(this.idioma);
      console.log('Idioma cambiado a:', this.idioma);
    } else {
      console.error(
        'No se pudo obtener el idioma seleccionado. Evento recibido:',
        event
      );
    }
  }

  // Redirige a configuracion
  cerrarYRedirigir() {
    this.router.navigate(['/configuracion']);
  }
}