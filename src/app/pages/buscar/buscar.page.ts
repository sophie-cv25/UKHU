import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CodigoModalComponent } from 'src/app/componentes/codigo-modal/codigo-modal.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: false
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

  categoriaSeleccionada: string = '';
  zonaSeleccionada: string = '';

  destino: {
    latitud: number,
    longitud: number,
    id?: string
  } | null = null;

  ubicacionUsuario: { lat: number, lng: number } | null = null;
  distanciasCalculadas: boolean = false; // Solo calcular una vez

  constructor(
    private databaseService: DatabaseService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['latitud'] && params['longitud'] && params['id']) {
        this.destino = {
          latitud: parseFloat(params['latitud']),
          longitud: parseFloat(params['longitud']),
          id: params['id']
        };
      } else {
        this.destino = null;
      }
      this.cargarRestaurantes();

      if (params['abrirCodigo']) {
        this.abrirCodigoModal(params);
      }
    });
  }

  actualizarUbicacion(event: { lat: number, lng: number }) {
    this.ubicacionUsuario = event;
    this.distanciasCalculadas = false; // Permitir recalcular si cambia ubicación
    if (this.restaurantes.length > 0) {
      this.calcularDistanciasYTiempo();
    }
  }

  async abrirCodigoModal(params: any) {
    const restauranteId = params['id'] || params['restauranteId'];
    const nombreRestaurante = params['nombreRestaurante'] || '';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const usuarioId = userData.id || '';
    const usuarioEmail = userData.email || '';
    const usuarioNombre = userData.nombre || '';

    const modal = await this.modalCtrl.create({
      component: CodigoModalComponent,
      componentProps: {
        restauranteId,
        nombreRestaurante,
        usuarioId,
        usuarioEmail,
        usuarioNombre,
      },
      backdropDismiss: false
    });
    await modal.present();
  }

  cargarRestaurantes() {
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any) => {
      this.restaurantes = data;
      this.categorias = [...new Set(this.restaurantes.map(restaurante => restaurante.categoria))];
      this.zonas = [...new Set(this.restaurantes.map(restaurante => restaurante.zona))];

      if (this.destino && this.destino.id) {
        this.restaurantesFiltrados = this.restaurantes.filter(r => r.id === this.destino!.id);
      } else {
        this.restaurantesFiltrados = this.restaurantes;
      }

      this.distanciasCalculadas = false; // Permitir recalcular si se recarga la data de restaurantes
      this.calcularDistanciasYTiempo();
    });
  }

  activarBusqueda() {
    this.busquedaActiva = true;
    this.restaurantesFiltrados = this.restaurantes;
    this.modal.present();

    if (!this.distanciasCalculadas) {
      this.calcularDistanciasYTiempo();
      this.distanciasCalculadas = true;
    }
  }

  calcularDistanciasYTiempo() {
    if (!this.ubicacionUsuario) return;
    const userLat = this.ubicacionUsuario.lat;
    const userLng = this.ubicacionUsuario.lng;

    this.restaurantes.forEach(rest => {
      if (rest.latitud && rest.longitud) {
        const d = this.calcularDistancia(userLat, userLng, rest.latitud, rest.longitud); // en km
        rest.distancia = d;
        rest.tiempo = d / 5 * 60; // minutos (velocidad promedio: 5km/h)
      } else {
        rest.distancia = null;
        rest.tiempo = null;
      }
    });

    // Forzar actualización de referencia
    this.restaurantesFiltrados = [...this.restaurantesFiltrados];
  }

  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Fórmula Haversine
    const R = 6371; // radio de la Tierra en km
    const dLat = this.gradosARadianes(lat2 - lat1);
    const dLon = this.gradosARadianes(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.gradosARadianes(lat1)) * Math.cos(this.gradosARadianes(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  gradosARadianes(grados: number): number {
    return grados * Math.PI / 180;
  }

  irARestaurante(restaurante: any) {
    this.modal.dismiss();
    this.navCtrl.navigateForward(`/restaurante-detalle/${restaurante.id}`);
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = (this.categoriaSeleccionada === categoria) ? '' : categoria;
    this.aplicarFiltros();
  }

  filtrarPorZona(zona: string) {
    this.zonaSeleccionada = (this.zonaSeleccionada === zona) ? '' : zona;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.restaurantesFiltrados = this.restaurantes.filter(restaurante => {
      const coincideCategoria = this.categoriaSeleccionada ? restaurante.categoria === this.categoriaSeleccionada : true;
      const coincideZona = this.zonaSeleccionada ? restaurante.zona === this.zonaSeleccionada : true;
      const coincideBusqueda = this.searchTerm.trim() === '' ? true : (
        restaurante.nombre?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurante.categoria?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurante.zona?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      return coincideCategoria && coincideZona && coincideBusqueda;
    });

    // Forzar actualización de referencia y cálculo cada vez que aplicas filtros
    this.calcularDistanciasYTiempo();
  }

  buscarRestaurantes() {
    if (!this.busquedaActiva) return;

    if (this.searchTerm.trim() !== '') {
      this.categoriaSeleccionada = '';
      this.zonaSeleccionada = '';
    }

    this.aplicarFiltros();
  }
}
