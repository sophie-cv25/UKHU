import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // ✅ Agregar TranslateModule y TranslateService

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    TranslateModule // ✅ Importar TranslateModule
  ]
})
export class TabBarComponent implements OnInit {
  idiomaActual: string = 'es';

  constructor(private translateService: TranslateService) { // ✅ Inyectar TranslateService
    this.idiomaActual = localStorage.getItem('idioma') || 'es';
    this.translateService.use(this.idiomaActual); // ✅ Establecer idioma predeterminado
  }

  ngOnInit() {
    console.log('🔹 Idioma actual:', this.translateService.currentLang); // ✅ Verificación
  }
}
