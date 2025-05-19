import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilLocalNoSuscritoPageRoutingModule } from './perfil-local-no-suscrito-routing.module';
import { PerfilLocalNoSuscritoPage } from './perfil-local-no-suscrito.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLocalNoSuscritoPageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilLocalNoSuscritoPage]
})
export class PerfilLocalNoSuscritoPageModule {}

