import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Para hacer llamadas http
import { HttpClientModule } from '@angular/common/http';

// Para utilizar formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';

// Para cargar Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

//para swiper
schema:[
  CUSTOM_ELEMENTS_SCHEMA
]


// Importar el componente de mapa
import { MapaComponent } from './componentes/mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent  // <-- nuevo componente
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  //para swiper sirve para hacer carrusel
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ⬅ Esta es la parte nueva
})
export class AppModule {}
