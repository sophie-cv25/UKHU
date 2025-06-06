import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';
import { SharedModule } from 'src/app/modulos/shared/shared.module';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    TabBarComponent,
    SharedModule,
    RouterLink,
    TranslateModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
