import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FieldValue, arrayUnion } from 'firebase/firestore';
import { map, tap } from 'rxjs';

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
    return runInInjectionContext(this.injector, async () => {
      const docRef = this.firestore.collection(collection).doc(uid);

      const docSnapshot = await docRef.get().toPromise();

      // 🔹 Verificamos que `docSnapshot` existe antes de acceder a `.exists`
      if (docSnapshot && docSnapshot.exists) {
        return docRef.update(data); // ✅ Si el documento existe, actualiza
      } else {
        return docRef.set(data); // ✅ Si no existe, lo crea
      }
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

  //  Guardar código usado en la subcolección "codigos-usados"
  saveCodigoUsado(codigo: string, usuarioEmail: string, usuarioNombre: string, restauranteUid: string, nombreRestaurante: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const restauranteRef = this.firestore.collection('restaurantes').doc(restauranteUid);
      const codigosUsadosRef = restauranteRef.collection('codigos-usados');

      await codigosUsadosRef.add({
        codigo,
        usuario_email: usuarioEmail,
        usuario_nombre: usuarioNombre,
        restaurante_id: restauranteUid, // Ahora usamos el UID real
        nombre_restaurante: nombreRestaurante,
        fecha_uso: new Date().toISOString()
      });

      console.log('Código guardado correctamente en codigos-usados.');
    });
  }

  saveHistorialVisita(usuarioId: string, restauranteId: string, nombreRestaurante: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      console.log(`✅ Guardando historial en el usuario: ${usuarioId}`);

      const usuarioRef = this.firestore.collection('users').doc(usuarioId); // ✅ Usamos `usuarioId`
      const historialRef = usuarioRef.collection('historial');

      await historialRef.add({
        restaurante_id: restauranteId,
        nombre_restaurante: nombreRestaurante,
        fecha_visita: new Date().toISOString()
      });

      console.log(`Historial guardado correctamente en el usuario ${usuarioId}.`);
    });
  }

  guardarRankingRestaurante(usuarioId: string, restauranteId: string, calificacion: number): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const restauranteRef = this.firestore.collection('restaurantes').doc(restauranteId);
      const rankingsRef = restauranteRef.collection('rankings');

      await rankingsRef.add({
        usuario_id: usuarioId,
        calificacion: calificacion,
        fecha: new Date().toISOString()
      });

      console.log(`✅ Ranking guardado en Firestore: ${calificacion} estrellas para ${restauranteId}`);
    });
  }

  getTopRestaurantes(limit: number = 5): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('restaurantes', ref =>
        ref.orderBy('rating', 'desc').limit(limit)
      ).valueChanges({ idField: 'id' });
    });
  }
  addResenaToRestaurante(restauranteId: string, resena: any): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const restauranteRef = this.firestore.collection('restaurantes').doc(restauranteId);
      const resenasRef = restauranteRef.collection('resenas');

      // 🔹 Verifica si `snapshot` es undefined antes de acceder a `empty`
      const snapshot = await resenasRef.get().toPromise();

      if (!snapshot || snapshot.empty) {
        console.log(' La subcolección "resenas" no existe, creando...');

        // Crear un primer documento para inicializar la subcolección
        await resenasRef.doc('_init').set({ mensaje: 'Subcolección creada' });
      }

      // 🔹 Ahora agregar la reseña
      await resenasRef.add(resena);
      console.log(` Reseña guardada correctamente en el restaurante ${restauranteId}.`);
    });
  }
  async ensureResenasSubcollection(restauranteId: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      try {
        const restauranteRef = this.firestore.collection('restaurantes').doc(restauranteId);
        const resenasRef = restauranteRef.collection('resenas');

        // 🔹 Verificar si la subcolección `resenas` tiene documentos
        const snapshot = await resenasRef.get().toPromise();
        if (!snapshot || snapshot.empty) {
          console.log(' La subcolección "resenas" no existe, creando...');

          await resenasRef.doc('_init').set({ mensaje: 'Subcolección creada' });
          console.log(' Subcolección "resenas" creada exitosamente.');
        }
      } catch (error) {
        console.error(' Error al crear la subcolección:', error);
      }
    });
  }

  updateResenasEnRestaurante(restauranteId: string, nuevaResena: any): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const restauranteRef = this.firestore.collection('restaurantes').doc(restauranteId);

      await restauranteRef.update({
        resenas: arrayUnion(nuevaResena)  // 🔹 Agregar la nueva reseña al array sin eliminar las anteriores
      });

      console.log(`✅ Reseña agregada en el restaurante ${restauranteId}.`);
    });
  }

  getResenasPorRestaurante(restauranteId: string): Observable<any[]> {
    return this.firestore.collection('resenas', ref => // 🔹 Cambiamos "reseñas" a "resenas"
      ref.where('restauranteId', '==', restauranteId)
    ).valueChanges();
  }




  getHistorialDeUsuario(usuarioId: string): Observable<any[]> {
    console.log(`🔎 Buscando historial en users/${usuarioId}/historial`);

    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(`users/${usuarioId}/historial`)
        .valueChanges({ idField: 'id' });
    }).pipe(
      tap(data => console.log(`✅ Datos de historial obtenidos de Firebase:`, data))
    );
  }
  getMisiones(): Observable<any[]> {
  return runInInjectionContext(this.injector, () => {
    return this.firestore.collection('misiones').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data };
      }))
    );
  });
}





  addMision(categoria: string, descripcion: string, llajua: number, imagenUrl: string, caducacion: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const misionesRef = this.firestore.collection('misiones');

      await misionesRef.add({
        categoria,
        descripcion,
        llajua,
        imagen: imagenUrl,  // URL de la imagen representativa
        caducacion,  // Fecha de caducidad de la misión (puede ser una fecha en formato string)
      });

      console.log(`✅ Misión "${categoria}" agregada correctamente con caducación en ${caducacion}.`);
    });
  }
}

