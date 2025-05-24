import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamificacionPageRoutingModule } from './gamificacion-routing.module';

import { GamificacionPage } from './gamificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamificacionPageRoutingModule
  ],
  declarations: [GamificacionPage]
})
export class GamificacionPageModule {}
