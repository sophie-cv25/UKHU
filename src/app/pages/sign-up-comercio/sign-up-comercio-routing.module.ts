import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComercioPage } from './sign-up-comercio.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpComercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpComercioPageRoutingModule {}
