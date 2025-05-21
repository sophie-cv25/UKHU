import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public http: HttpClient,
    public firestore: AngularFirestore,
    private injector: Injector
  ) { }

  // Función para cargar JSON desde `assets/restaurantes.json`
  fetchLocalRestaurants(): Observable<any> {
    return this.http.get('/assets/restaurantes.json');
  }

  // Función para subir restaurantes a Firebase Firestore
  subirRestaurantesAFirebase(): void {
    this.fetchLocalRestaurants().subscribe(restaurantsData => {
      runInInjectionContext(this.injector, () => {
        restaurantsData.forEach((restaurant: any) => {
          this.firestore.collection('restaurantes').doc(restaurant.nombre).set(restaurant)
            .then(() => console.log(`Restaurante ${restaurant.nombre} agregado correctamente`))
            .catch(error => console.error(`Error al subir ${restaurant.nombre}:`, error));
        });
      });
    });
  }

  // Leer todos los registros de una colección
  fetchFirestoreCollection(collection: string): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collection).valueChanges({ idField: 'id' });
    });
  }

  // Guardar un documento en Firestore
  addFirestoreDocument(collectionName: string, collectionData: any) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collectionName).add(collectionData);
    });
  }

  // Actualizar un documento
  updateFireStoreDocument(collection: string, uid: string, data: any) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collection).doc(uid).update(data);
    });
  }

  // Eliminar un documento
  deleteFireStoreDocument(collection: string, id: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collection).doc(id).delete();
    });
  }

  // Obtener documento por ID
  getDocumentById(collection: string, uid: string): Observable<any> {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection(collection).doc(uid).snapshotChanges();
  });
}
  getCollectionByCustomparam(collection: string, customParam: string, searched: string): Observable<any> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collection, ref => ref.where(customParam, '==', searched))
        .valueChanges({ idField: 'id' });
    });
  }
}
