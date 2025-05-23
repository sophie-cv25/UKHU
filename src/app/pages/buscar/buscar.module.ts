import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuscarPageRoutingModule } from './buscar-routing.module';
import { BuscarPage } from './buscar.page';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarPageRoutingModule,
    TabBarComponent,
    SharedModule,
    TranslateModule
  ],
  declarations: [BuscarPage]
})
export class BuscarPageModule {}
