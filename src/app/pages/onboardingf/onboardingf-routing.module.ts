import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingfPage } from './onboardingf.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingfPageRoutingModule {}
