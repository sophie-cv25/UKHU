import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamificacionPage } from './gamificacion.page';

const routes: Routes = [
  {
    path: '',
    component: GamificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamificacionPageRoutingModule {}
