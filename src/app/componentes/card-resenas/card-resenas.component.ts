import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-resenas',
  templateUrl: './card-resenas.component.html',
  styleUrls: ['./card-resenas.component.scss'],
  standalone: false
})
export class CardResenasComponent {
  @Input() nombre: string = '';
  @Input() comentario: string = '';
  // Si quieres que las estrellas sean dinámicas, agrega un input para la cantidad
}