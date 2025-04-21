import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventosPageRoutingModule } from './eventos-routing.module';
import { EventosPage } from './eventos.page';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosPageRoutingModule,
    TabBarComponent
  ],
  declarations: [EventosPage]
})
export class EventosPageModule {}
