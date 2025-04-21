import { Component, OnInit } from '@angular/core';
import { IonTabs, IonContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ]
})
export class TabBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
