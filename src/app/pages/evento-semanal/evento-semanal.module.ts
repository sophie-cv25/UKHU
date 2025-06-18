import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventoSemanalPageRoutingModule } from './evento-semanal-routing.module';
import { EventoSemanalPage } from './evento-semanal.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TabBarComponent,
    TranslateModule,
    EventoSemanalPageRoutingModule

  ],
  declarations: [EventoSemanalPage]
})
export class EventoSemanalPageModule {}
