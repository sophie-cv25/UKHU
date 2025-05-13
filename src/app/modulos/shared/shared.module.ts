import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';
import { Input1Component } from 'src/app/componentes/input1/input1.component';
import { Input2Component } from 'src/app/componentes/input2/input2.component';
import { CardComponent } from 'src/app/componentes/card/card.component';
import { Card2Component } from 'src/app/componentes/card-2/card-2.component';
import { CardNotificacionComponent } from 'src/app/componentes/card-notificacion/card-notificacion.component';
import { MapComponent } from 'src/app/componentes/map/map.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    Input1Component,
    Input2Component,
    CardComponent,
    Card2Component,
    CardNotificacionComponent,
    MapComponent
  ],
  exports:[
    Input1Component,
    Input2Component,
    CardComponent,
    Card2Component,
    CardNotificacionComponent,
    MapComponent,
  IonicModule
],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
