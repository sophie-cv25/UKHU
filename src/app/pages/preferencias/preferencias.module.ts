import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferenciasPageRoutingModule } from './preferencias-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PreferenciasPage } from './preferencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferenciasPageRoutingModule,
    TranslateModule
  ],
  declarations: [PreferenciasPage]
})
export class PreferenciasPageModule {}
