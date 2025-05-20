import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeusuarioPageRoutingModule } from './homeusuario-routing.module';
import { HomeusuarioPage } from './homeusuario.page';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { register } from 'swiper/element/bundle';
register();
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeusuarioPageRoutingModule,
    SharedModule,
    TabBarComponent,
  ],
  declarations: [HomeusuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeusuarioPageModule {}