import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPerfilcPageRoutingModule } from './edit-perfilc-routing.module';

import { EditPerfilcPage } from './edit-perfilc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPerfilcPageRoutingModule
  ],
  declarations: [EditPerfilcPage]
})
export class EditPerfilcPageModule {}
