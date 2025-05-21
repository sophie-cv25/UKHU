import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false,
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() latitud?: number;
  @Input() longitud?: number;
  @Input() soloDestino?: boolean = false;
  @Input() idDestino?: string;

  private map!: L.Map;
  items: any[] = [];

  constructor(public db: DatabaseService) {}

  ngAfterViewInit(): void {
    this.db.fetchFirestoreCollection('restaurantes').subscribe((data: any[]) => {
      this.items = data.map((r: any, idx: number) => ({ id: r.id ?? idx, ...r }));
      this.initMap();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.initMap();
    }
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map', {
      center: [this.latitud ?? -16.5, this.longitud ?? -68.15],
      zoom: 15
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.soloDestino && this.latitud && this.longitud) {
      // Solo muestra el destino
      L.marker([this.latitud, this.longitud], {
        icon: L.icon({
          iconUrl: 'assets/icon/favicon.png',
          iconSize: [38, 38],
          iconAnchor: [22, 94],
          popupAnchor: [-15, -88]
        })
      })
      .addTo(this.map)
      .bindPopup(`<b>Destino seleccionado</b>`)
      .openPopup();
    } else {
      // Muestra todos los restaurantes
      this.items.forEach((element: any) => {
        if (element.latitud && element.longitud) {
          L.marker([element.latitud, element.longitud], {
            icon: L.icon({
              iconUrl: 'assets/icon/favicon.png',
              iconSize: [38, 38],
              iconAnchor: [22, 94],
              popupAnchor: [-15, -88]
            })
          })
          .addTo(this.map)
          .bindPopup(`<b>${element.nombre}</b><br>${element.direccion ?? ''}`);
        }
      });
    }
  }
}