import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComercioPage } from './signin-comercio.page';

const routes: Routes = [
  {
    path: '',
    component: SigninComercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninComercioPageRoutingModule {}
