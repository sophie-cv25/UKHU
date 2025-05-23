import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninComercioPageRoutingModule } from './signin-comercio-routing.module';

import { SigninComercioPage } from './signin-comercio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninComercioPageRoutingModule
  ],
  declarations: [SigninComercioPage]
})
export class SigninComercioPageModule {}
