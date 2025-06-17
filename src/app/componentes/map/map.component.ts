import { Component, AfterViewInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
  @Output() ubicacionActual = new EventEmitter<{lat: number, lng: number}>();

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

    if (this.soloDestino && this.latitud && this.longitud) {
      this.map = L.map('map', {
        center: [this.latitud, this.longitud],
        zoom: 15
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      L.marker([this.latitud, this.longitud], {
        icon: L.icon({
          iconUrl: 'assets/icon/Puntosrosa.svg',
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38]
        })
      })
      .addTo(this.map)
      .bindPopup(`<b>Destino seleccionado</b>`)
      .openPopup();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.ubicacionActual.emit({ lat: position.coords.latitude, lng: position.coords.longitude });
            this.loadMapWithLocation(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            this.ubicacionActual.emit({ lat: -16.5, lng: -68.15 });
            this.loadMapWithLocation(-16.5, -68.15);
          },
          { enableHighAccuracy: true }
        );
      } else {
        this.ubicacionActual.emit({ lat: -16.5, lng: -68.15 });
        this.loadMapWithLocation(-16.5, -68.15);
      }
    }
  }

  private loadMapWithLocation(lat: number, lng: number) {
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 15
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'assets/icon/Perfilrosa.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      })
    }).addTo(this.map)
      .bindPopup('<b>Mi ubicación actual</b>')
      .openPopup();

    this.items.forEach((element: any) => {
      if (element.latitud && element.longitud) {
        L.marker([element.latitud, element.longitud], {
          icon: L.icon({
            iconUrl: 'assets/icon/Puntosrosa.svg',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
          })
        })
        .addTo(this.map)
        .bindPopup(`<b>${element.nombre}</b><br>${element.direccion ?? ''}`);
      }
    });
  }
}