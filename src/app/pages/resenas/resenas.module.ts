import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResenasPageRoutingModule } from './resenas-routing.module';

import { ResenasPage } from './resenas.page';
import { SharedModule } from '../../modulos/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResenasPageRoutingModule,
    SharedModule
  ],
  declarations: [ResenasPage]
})
export class ResenasPageModule {}
