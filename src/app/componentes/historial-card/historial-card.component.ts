import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-card',
  templateUrl: './historial-card.component.html',
  styleUrls: ['./historial-card.component.scss'],
  standalone: false
})
export class HistorialCardComponent implements OnInit {
  @Input() nombreRestaurante: string = '';
  @Input() fechaVisita: string = '';

  ngOnInit() {
    console.log('📝 Datos recibidos por HistorialCardComponent:', {
      nombreRestaurante: this.nombreRestaurante,
      fechaVisita: this.fechaVisita
    });
  }
}
