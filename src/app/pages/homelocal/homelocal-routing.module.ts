import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomelocalPage } from './homelocal.page';

const routes: Routes = [
  {
    path: '',
    component: HomelocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomelocalPageRoutingModule {}
