import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],  // Cambié .css a .scss si estás usando SCSS en tu proyecto
  standalone: false,
})
export class MapaComponent implements AfterViewInit {

  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Inicializa el mapa con las coordenadas de Bolivia
    this.map = L.map('mapa').setView([-16.5, -68.15], 13);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregar el marcador
    L.marker([-16.5000, -68.1193]).addTo(this.map)
      .bindPopup('¡Bienvenido a Bolivia!')  // Popup que aparece al hacer clic
      .openPopup();  // Abre automáticamente el popup
  }
}
