import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evento-semanal',
  templateUrl: './evento-semanal.page.html',
  styleUrls: ['./evento-semanal.page.scss'],
  standalone: false
})
export class EventoSemanalPage implements OnInit {

  tiposDeComida = [
    { nombre: 'Hamburguesa', imagen: 'assets/images/Hamburguesa.png' },
    { nombre: 'Alitas', imagen: 'assets/images/alitas.png' },
    { nombre: 'Anticucho', imagen: 'assets/images/brochetas.png'},
  ];

  localesParticipantes = [
    {
      nombre: 'ZilveTow',
      imagen: 'assets/images/alta.png',
      infoExtra: '3 min - 800m',
      cierre: 'Cierra a las 7pm',
    },
   {
      nombre: 'Cocki Burguer',
      imagen: 'assets/images/burger.png',
      infoExtra: '5 min - 950m',
      cierre: 'Cierra a las 8pm',
    },
  ];

  constructor() { }

  ngOnInit() {}

}

