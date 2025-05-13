import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignInPageRoutingModule } from './sign-in-routing.module';
import { SignInPage } from './sign-in.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { Router, RouterLink } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    SharedModule,
    RouterLink
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
