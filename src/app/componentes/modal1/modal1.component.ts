import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButton, IonModal, IonToolbar } from "@ionic/angular";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.scss'],
  standalone:true,
  imports: [
    IonicModule,
  ]
})
export class Modal1Component  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
