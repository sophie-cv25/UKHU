import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarLocalPageRoutingModule } from './editar-local-routing.module';

import { EditarLocalPage } from './editar-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarLocalPageRoutingModule
  ],
  declarations: [EditarLocalPage]
})
export class EditarLocalPageModule {}
