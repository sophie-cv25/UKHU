import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // <--- ¡Añade CUSTOM_ELEMENTS_SCHEMA aquí!
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecompensasPageRoutingModule } from './recompensas-routing.module';

import { RecompensasPage } from './recompensas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecompensasPageRoutingModule
  ],
  declarations: [RecompensasPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // <--- ¡Añade esta línea en el array 'schemas'!
})
export class RecompensasPageModule {}