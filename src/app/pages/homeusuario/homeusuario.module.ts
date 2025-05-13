import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeusuarioPageRoutingModule } from './homeusuario-routing.module';

import { HomeusuarioPage } from './homeusuario.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeusuarioPageRoutingModule,
    SharedModule,
  ],
  declarations: [HomeusuarioPage]
})
export class HomeusuarioPageModule {}
