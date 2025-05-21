import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPerfilcPage } from './edit-perfilc.page';

const routes: Routes = [
  {
    path: '',
    component: EditPerfilcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPerfilcPageRoutingModule {}
