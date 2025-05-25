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
        this.cdr.detectChanges(); // Detecta cambios manualmente
      });
    }
  }
}
