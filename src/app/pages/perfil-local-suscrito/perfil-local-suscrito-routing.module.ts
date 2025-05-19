import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilLocalSuscritoPage } from './perfil-local-suscrito.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLocalSuscritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLocalSuscritoPageRoutingModule {}
