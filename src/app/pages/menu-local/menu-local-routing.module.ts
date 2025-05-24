import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuLocalPage } from './menu-local.page';

const routes: Routes = [
  {
    path: '',
    component: MenuLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuLocalPageRoutingModule {}
