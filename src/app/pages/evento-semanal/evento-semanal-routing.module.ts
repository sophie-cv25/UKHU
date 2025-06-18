import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoSemanalPage } from './evento-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: EventoSemanalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoSemanalPageRoutingModule {}
