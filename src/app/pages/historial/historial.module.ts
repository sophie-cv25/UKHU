import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistorialPageRoutingModule } from './historial-routing.module';
import { HistorialPage } from './historial.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialPageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [HistorialPage]
})
export class HistorialPageModule {}

