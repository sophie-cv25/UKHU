import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilLocalSuscritoPageRoutingModule } from './perfil-local-suscrito-routing.module';
import { PerfilLocalSuscritoPage } from './perfil-local-suscrito.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLocalSuscritoPageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilLocalSuscritoPage]
})
export class PerfilLocalSuscritoPageModule {}
