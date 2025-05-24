import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuLocalPageRoutingModule } from './menu-local-routing.module';

import { MenuLocalPage } from './menu-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuLocalPageRoutingModule
  ],
  declarations: [MenuLocalPage]
})
export class MenuLocalPageModule {}
