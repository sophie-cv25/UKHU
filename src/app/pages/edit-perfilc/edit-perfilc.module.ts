import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditPerfilcPageRoutingModule } from './edit-perfilc-routing.module';
import { EditPerfilcPage } from './edit-perfilc.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPerfilcPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditPerfilcPage]
})
export class EditPerfilcPageModule {}
