import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RestauranteDetallePageRoutingModule } from './restaurante-detalle-routing.module';
import { RestauranteDetallePage } from './restaurante-detalle.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauranteDetallePageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [RestauranteDetallePage]
})
export class RestauranteDetallePageModule {}
