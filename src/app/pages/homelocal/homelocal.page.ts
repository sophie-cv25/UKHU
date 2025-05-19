import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-homelocal',
  templateUrl: './homelocal.page.html',
  styleUrls: ['./homelocal.page.scss'],
  standalone: false,
})
export class HomelocalPage implements OnInit {
  restaurante: any = null;
  comentarios: any[] = [];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    // Simula obtener el restaurante actual
    this.restaurante = {
      nombre: 'Pollo Frito Sophie',
      ranking: 7,
      estado: 'Cerrado'
    };

    // Obtiene comentarios locales (ajusta el nombre de la función si es necesario)
   // this.databaseService.fetchLocalComentarios().subscribe((data: any[]) => {
      //this.comentarios = data.filter(c => c.restaurante === 'Pollo Frito Sophie');
    //});
  }
}