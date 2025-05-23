import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { ConfiguracionPage } from './configuracion.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
TranslateModule
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}

