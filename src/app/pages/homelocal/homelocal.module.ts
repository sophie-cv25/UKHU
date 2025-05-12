import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomelocalPageRoutingModule } from './homelocal-routing.module';

import { HomelocalPage } from './homelocal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomelocalPageRoutingModule
  ],
  declarations: [HomelocalPage]
})
export class HomelocalPageModule {}
