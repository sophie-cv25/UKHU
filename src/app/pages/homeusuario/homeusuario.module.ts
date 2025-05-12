import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeusuarioPageRoutingModule } from './homeusuario-routing.module';

import { HomeusuarioPage } from './homeusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeusuarioPageRoutingModule
  ],
  declarations: [HomeusuarioPage]
})
export class HomeusuarioPageModule {}
