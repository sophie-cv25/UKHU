import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
  standalone: false,
})
export class ResenasPage implements OnInit {
  resenas$: Observable<any[]> | undefined;
  restauranteId: string = '';

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute // ✅ Importamos ActivatedRoute para leer la URL
  ) {}

  ngOnInit() {
  this.restauranteId = localStorage.getItem('restauranteId') || '';
  console.log('📢 Restaurante ID obtenido:', this.restauranteId);

  if (this.restauranteId) {
    this.resenas$ = this.databaseService.getResenasPorRestaurante(this.restauranteId);
    this.resenas$.subscribe(data => console.log('✅ Reseñas obtenidas:', data));
  }
}

}
