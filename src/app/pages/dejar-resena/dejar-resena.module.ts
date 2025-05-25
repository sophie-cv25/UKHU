import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DejarResenaPageRoutingModule } from './dejar-resena-routing.module';

import { DejarResenaPage } from './dejar-resena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DejarResenaPageRoutingModule
  ],
  declarations: [DejarResenaPage]
})
export class DejarResenaPageModule {}
