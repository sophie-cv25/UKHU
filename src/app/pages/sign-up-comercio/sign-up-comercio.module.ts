import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpComercioPageRoutingModule } from './sign-up-comercio-routing.module';

import { SignUpComercioPage } from './sign-up-comercio.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpComercioPageRoutingModule,
    TranslateModule
  ],
  declarations: [SignUpComercioPage]
})
export class SignUpComercioPageModule {}
