import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { EditarLocalPageRoutingModule } from './editar-local-routing.module';

import { EditarLocalPage } from './editar-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarLocalPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditarLocalPage]
})
export class EditarLocalPageModule {}
