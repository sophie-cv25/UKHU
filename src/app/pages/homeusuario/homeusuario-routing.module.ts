import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeusuarioPage } from './homeusuario.page';

const routes: Routes = [
  {
    path: '',
    component: HomeusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeusuarioPageRoutingModule {}
