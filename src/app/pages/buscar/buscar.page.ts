import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';

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
  searchTerm: string = '';
  busquedaActiva: boolean = false;

  constructor( private databaseService: DatabaseService, private navCtrl: NavController ) { }

  ngOnInit() {
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any) => {
      this.restaurantes = data;
      console.log("Restaurantes:", this.restaurantes);
  });
  }

  activarBusqueda() {
    this.busquedaActiva = true;
    this.restaurantesFiltrados = this.restaurantes;
    this.modal.present();
  }

  irARestaurante(restaurante: any) {
    console.log ('Navegando a:', `/restaurante-detalle/${restaurante.id}`);
  this.modal.dismiss();
  this.navCtrl.navigateForward(`/restaurante-detalle/${restaurante.id}`); // ✅ Usa el nombre correcto de la ruta
}



  buscarRestaurantes() {
if (!this.busquedaActiva) return; 

    if (this.searchTerm.trim() === '') {
      this.restaurantesFiltrados = this.restaurantes;
    } else {
      this.restaurantesFiltrados = this.restaurantes.filter((restaurante) =>
        restaurante.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurante.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
