import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: false,
})
export class HistorialPage implements OnInit {
  usuarioId: string = '';
  historial: any[] = [];
  locales: number = 0;
  puntos: number = 0;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usuarioId = this.route.snapshot.paramMap.get('id') || '';
    console.log('📢 ID del usuario obtenido:', this.usuarioId);

    if (this.usuarioId) {
      this.databaseService.getHistorialDeUsuario(this.usuarioId).subscribe(data => {
        console.log('✅ Historial extraído:', data);
        this.historial = data;

        this.locales = this.historial.length; // Contamos los elementos en el historial
        this.puntos = this.locales * 10; // Calculamos los puntos

        // Guardar valores en localStorage
        localStorage.setItem('locales', JSON.stringify(this.locales));
        localStorage.setItem('puntos', JSON.stringify(this.puntos));

        this.cdr.detectChanges();
        console.log('🔢 Total de registros:', this.locales);
        console.log('⭐ Puntos acumulados:', this.puntos);
      });
    }
  }
}
