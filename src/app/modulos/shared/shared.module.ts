import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';
import { Input1Component } from 'src/app/componentes/input1/input1.component';
import { Input2Component } from 'src/app/componentes/input2/input2.component';
import { CardComponent } from 'src/app/componentes/card/card.component';
import { Card2Component } from 'src/app/componentes/card-2/card-2.component';
import { CardNotificacionComponent } from 'src/app/componentes/card-notificacion/card-notificacion.component';
import { MapComponent } from 'src/app/componentes/map/map.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Modal1Component } from 'src/app/componentes/modal1/modal1.component';
import { Modal2Component } from 'src/app/componentes/modal2/modal2.component';
import { ModalSoporteTecnicoComponent } from 'src/app/componentes/modal-soporte-tecnico/modal-soporte-tecnico.component';
import { CardResenasComponent } from 'src/app/componentes/card-resenas/card-resenas.component';
import { CodigoModalComponent } from 'src/app/componentes/codigo-modal/codigo-modal.component';
import { FormsModule } from '@angular/forms';
import { RankingModalComponent } from 'src/app/componentes/ranking-modal/ranking-modal.component';
import { HistorialCardComponent } from 'src/app/componentes/historial-card/historial-card.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    Input1Component,
    Input2Component,
    CardComponent,
    Card2Component,
    CardNotificacionComponent,
    MapComponent,
    Modal1Component,
    Modal2Component,
    ModalSoporteTecnicoComponent,
    CardResenasComponent,
    CodigoModalComponent,
    RankingModalComponent,
    HistorialCardComponent,
  ],
  exports:[
    Input1Component,
    Input2Component,
    CardComponent,
    Card2Component,
    CardNotificacionComponent,
    MapComponent,
  Modal1Component,
  Modal2Component,
  ModalSoporteTecnicoComponent,
  CardResenasComponent,
  CodigoModalComponent,
  FormsModule,
  RankingModalComponent,
  HistorialCardComponent
],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
