import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingfPageRoutingModule } from './onboardingf-routing.module';

import { OnboardingfPage } from './onboardingf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingfPageRoutingModule
  ],
  declarations: [OnboardingfPage]
})
export class OnboardingfPageModule {}
