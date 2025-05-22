import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone:false
})
export class BuscarPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  restaurantes: any[] = [];
  restaurantesFiltrados: any[] = [];
  zonas: string[] = [];
  categorias: string[] = [];
  searchTerm: string = '';
  busquedaActiva: boolean = false;
  mostrarFiltros: boolean = false;
  destino: {
    latitud: number,
    longitud: number,
    id?: string
  } | null = null;

  constructor(private databaseService: DatabaseService, private navCtrl: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['latitud'] && params['longitud'] && params['id']) {
        // Entró desde "Cómo llegar"
        this.destino = {
          latitud: parseFloat(params['latitud']),
          longitud: parseFloat(params['longitud']),
          id: params['id']
        };
      } else {
        // Entró desde el tab bar
        this.destino = null;
      }
      this.cargarRestaurantes();
    });
  }

  cargarRestaurantes() {
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any) => {
      this.restaurantes = data;
      this.categorias = [...new Set(this.restaurantes.map(restaurante => restaurante.categoria))];
      this.zonas = [...new Set(this.restaurantes.map(restaurante => restaurante.zona))];

      if (this.destino && this.destino.id) {
        // Solo el restaurante seleccionado
        this.restaurantesFiltrados = this.restaurantes.filter(r => r.id === this.destino!.id);
      } else {
        // Todos los restaurantes
        this.restaurantesFiltrados = this.restaurantes;
      }
    });
  }

  activarBusqueda() {
    this.busquedaActiva = true;
    this.restaurantesFiltrados = this.restaurantes;
    this.modal.present();
  }

  irARestaurante(restaurante: any) {
    this.modal.dismiss();
    this.navCtrl.navigateForward(`/restaurante-detalle/${restaurante.id}`);
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  filtrarPorCategoria(categoria: string) {
  this.restaurantesFiltrados = this.restaurantes.filter(restaurante => restaurante.categoria === categoria);
  this.mostrarFiltros = false; // Cierra los filtros
}

filtrarPorZona(zona: string) {
  this.restaurantesFiltrados = this.restaurantes.filter(restaurante => restaurante.zona === zona);
  this.mostrarFiltros = false; // Cierra los filtros
}

  buscarRestaurantes() {
  if (!this.busquedaActiva) return; 
  if (this.searchTerm.trim() === '') {
    this.restaurantesFiltrados = this.restaurantes;
  } else {
    const term = this.searchTerm.toLowerCase();
    this.restaurantesFiltrados = this.restaurantes.filter((restaurante) =>
      restaurante.nombre?.toLowerCase().includes(term) ||
      restaurante.categoria?.toLowerCase().includes(term) ||
      restaurante.zona?.toLowerCase().includes(term) // <-- Filtra por zona también
    );
  }
}
}