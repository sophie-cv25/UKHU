import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GamificacionPageRoutingModule } from './gamificacion-routing.module';
import { GamificacionPage } from './gamificacion.page';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamificacionPageRoutingModule,
    TabBarComponent,
    TranslateModule
  ],
  declarations: [GamificacionPage]
})
export class GamificacionPageModule {}
