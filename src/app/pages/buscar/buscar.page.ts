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
    this.mostrarFiltros = false;
  }

  filtrarPorZona(zona: string) {
    this.restaurantesFiltrados = this.restaurantes.filter(restaurante => restaurante.zona === zona);
    this.mostrarFiltros = false;
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
        restaurante.zona?.toLowerCase().includes(term)
      );
    }
  }
}
