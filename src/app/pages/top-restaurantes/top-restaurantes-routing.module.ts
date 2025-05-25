import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopRestaurantesPage } from './top-restaurantes.page';

const routes: Routes = [
  {
    path: '',
    component: TopRestaurantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopRestaurantesPageRoutingModule {}
