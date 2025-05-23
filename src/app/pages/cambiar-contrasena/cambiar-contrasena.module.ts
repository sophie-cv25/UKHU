import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CambiarContrasenaPageRoutingModule } from './cambiar-contrasena-routing.module';
import { CambiarContrasenaPage } from './cambiar-contrasena.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContrasenaPageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [CambiarContrasenaPage]
})
export class CambiarContrasenaPageModule {}
