import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PuntosPageRoutingModule } from './puntos-routing.module';
import { PuntosPage } from './puntos.page';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntosPageRoutingModule,
    TabBarComponent
  ],
  declarations: [PuntosPage]
})
export class PuntosPageModule {}
