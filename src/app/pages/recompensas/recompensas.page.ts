import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.page.html',
  styleUrls: ['./recompensas.page.scss'],
  standalone: false // Esto es CORRECTO y necesario para la solución
})
export class RecompensasPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }
}