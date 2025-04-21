import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SharedModule } from '../modulos/shared/shared.module';
import { HomePageRoutingModule } from './home-routing.module';
import { TabBarComponent } from '../componentes/tab-bar/tab-bar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TabBarComponent,
    SharedModule,

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
