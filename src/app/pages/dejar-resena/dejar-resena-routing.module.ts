import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DejarResenaPage } from './dejar-resena.page';

const routes: Routes = [
  {
    path: '',
    component: DejarResenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DejarResenaPageRoutingModule {}
