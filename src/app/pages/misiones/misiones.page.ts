import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.page.html',
  styleUrls: ['./misiones.page.scss'],
  standalone: false
})
export class MisionesPage implements OnInit {

  misionesDiarias: any[] = [];
  misionesSemanales: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.obtenerMisiones();
  }

  obtenerMisiones() {
    this.databaseService.getMisiones().subscribe((misiones: any[]) => {
      console.log('🔥 Misiones obtenidas:', misiones);

      // Agregamos valores por defecto de progreso visual
      const misionesConProgreso = misiones.map(m => ({
        ...m,
        progreso: 60, // Cambia esto si tenés una lógica real de progreso
        progresoTexto: '3/5 completado' // Texto opcional por ahora
      }));

      // Filtramos por tipo
      this.misionesDiarias = misionesConProgreso.filter(m =>
        m.categoria === 'RESTAURANTE' || m.categoria === 'COMIDA' || m.categoria === 'CULTURAL'
      );

      this.misionesSemanales = misionesConProgreso.filter(m =>
        m.categoria === 'SEMANAL 1' || m.categoria === 'SEMANAL 2'
      );
    }, error => {
      console.error('❌ Error al obtener las misiones:', error);
    });
  }
}
