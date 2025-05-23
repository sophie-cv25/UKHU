import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPaswordPageRoutingModule } from './forgot-pasword-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ForgotPaswordPage } from './forgot-pasword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPaswordPageRoutingModule,
    RouterLink,
    TranslateModule
  ],
  declarations: [ForgotPaswordPage]
})
export class ForgotPaswordPageModule {}
