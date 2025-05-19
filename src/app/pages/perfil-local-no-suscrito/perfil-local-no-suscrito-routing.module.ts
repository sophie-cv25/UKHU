import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilLocalNoSuscritoPage } from './perfil-local-no-suscrito.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLocalNoSuscritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLocalNoSuscritoPageRoutingModule {}
