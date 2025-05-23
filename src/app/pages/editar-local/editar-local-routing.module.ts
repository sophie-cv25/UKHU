import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarLocalPage } from './editar-local.page';

const routes: Routes = [
  {
    path: '',
    component: EditarLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarLocalPageRoutingModule {}
