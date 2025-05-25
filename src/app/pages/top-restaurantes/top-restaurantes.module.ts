import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopRestaurantesPageRoutingModule } from './top-restaurantes-routing.module';

import { TopRestaurantesPage } from './top-restaurantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopRestaurantesPageRoutingModule
  ],
  declarations: [TopRestaurantesPage]
})
export class TopRestaurantesPageModule {}
