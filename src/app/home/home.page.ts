import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para leer JSON

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  isActionSheetOpen = false;
  ActionSheetButtons = [];
  restaurantes: any[] = []; // Lista para almacenar restaurantes

  constructor(
    private http: HttpClient, // Agregado para leer JSON desde assets
    public db: DatabaseService,
    public modal: ModalController
  ) {}

  ngOnInit(): void {
    // Cargar restaurantes desde Firebase
    this.db.fetchFirestoreCollection('restaurantes').subscribe(data => {
      this.restaurantes = data;
      console.log('Restaurantes cargados desde Firestore:', this.restaurantes);
    });

    // // Cargar datos desde el archivo JSON en assets
    // this.http.get<any[]>('assets/restaurantes.json').subscribe(data => {
    //   console.log('Archivo JSON cargado:', data);
    //   this.subirRestaurantesAFirestore(data);
    // });

    // Ejemplo de inserción de usuario
    // this.db.addFirestoreDocument('users', {
    //   name: 'Juanito',
    //   email: 'juanito@gmail.com',
    //   password: 123456,
    //   phone: 123456789,
    // }).then((res) => {
    //   console.log('Usuario creado', res.id);
    // }).catch((err) => {
    //   console.log('Error al crear el usuario', err);
    // });
  }

  // Función para subir restaurantes a Firestore
  // subirRestaurantesAFirestore(restaurantes: any[]): void {
  //   restaurantes.forEach(restaurante => {
  //     this.db.addFirestoreDocument("restaurantes", restaurante)
  //       .then(res => console.log(`Restaurante ${restaurante.nombre} agregado con ID:`, res.id))
  //       .catch(err => console.log(`Error al agregar ${restaurante.nombre}:`, err));
  //   });
  // }
}
