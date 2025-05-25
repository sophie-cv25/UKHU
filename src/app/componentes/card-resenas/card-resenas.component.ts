import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-resenas',
  templateUrl: './card-resenas.component.html',
  styleUrls: ['./card-resenas.component.scss'],
  standalone: false
})
export class CardResenasComponent {
  @Input() usuario: string = ''; // Cambia "nombre" por "usuario"
  @Input() comentario: string = '';
  @Input() rating: number = 0; // ⭐ Nuevo input para recibir el rating del usuario

  getStars(): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < this.rating ? 'star' : 'star-outline'));
  }
}
