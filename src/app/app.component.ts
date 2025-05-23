import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { LanguageService } from './services/language.service'; // ✅ Importar el servicio de idioma

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    public db: DatabaseService,
    private languageService: LanguageService // ✅ Inyectar el servicio de idioma
  ) {
    this.db.fetchFirestoreCollection('Restaurant')
      .subscribe((res:any) => { console.log(res); });

    this.languageService.cargarIdioma(); // ✅ Aplicar el idioma global al iniciar la app
  }
}
