import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service'; 
@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
  standalone:false
})
export class PreferenciasPage implements OnInit {
  idiomaSeleccionado: string = 'es';

  constructor(private languageService: LanguageService) {} 

  ngOnInit() {
    this.idiomaSeleccionado = localStorage.getItem('idioma') || 'es';
  }

  cambiarIdioma(idioma: string) {
    this.languageService.cambiarIdioma(idioma);
    this.idiomaSeleccionado = idioma;
    this.idiomaSeleccionado = idioma;
    window.location.reload();
  }
}
