import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-editar-local',
  templateUrl: './editar-local.page.html',
  styleUrls: ['./editar-local.page.scss'],
  standalone: false
})
export class EditarLocalPage implements OnInit {
  userData: any = {};
  iconosPerfilLocal: string[] = [
    'Perfilnegro.svg',
    'Perfilplomo.svg',
    'Perfilrosa.svg',
    'Perfilrosao.svg'
  ];
  iconoSeleccionado: number = 0;
  fotoPerfilUrl: string = '';  // 🔹 Agregamos una opción para la URL de la foto

  constructor(
    private dbService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      if (this.userData.iconoPerfilLocal) {
        const idx = this.iconosPerfilLocal.indexOf(this.userData.iconoPerfilLocal);
        this.iconoSeleccionado = idx !== -1 ? idx : 0;
      }
      // 🔹 Cargar la URL de la foto si está almacenada
      this.fotoPerfilUrl = this.userData.fotoPerfilUrl || '';
    } else {
      this.userData = {};
    }

    // Inicializar horarios si no existen
    if (!this.userData.horarioAtencion) {
      this.userData.horarioAtencion = { apertura: '', cierre: '' };
    }
  }

  anteriorIcono() {
    this.iconoSeleccionado = (this.iconoSeleccionado - 1 + this.iconosPerfilLocal.length) % this.iconosPerfilLocal.length;
  }

  siguienteIcono() {
    this.iconoSeleccionado = (this.iconoSeleccionado + 1) % this.iconosPerfilLocal.length;
  }

  guardarCambios() {
    // 🔹 Guardamos el ícono o la URL en el orden de prioridad
    this.userData.iconoPerfilLocal = this.iconosPerfilLocal[this.iconoSeleccionado];
    this.userData.fotoPerfilUrl = this.fotoPerfilUrl.trim() ? this.fotoPerfilUrl : '';

    localStorage.setItem('userData', JSON.stringify(this.userData));

    // 🔹 Guardar en Firestore dentro de `restaurantes`
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) return;
    const prevUserData = JSON.parse(storedUserData);
    if (!prevUserData.uid) return;

    const updatedData: any = {
      ...this.userData,
      // 🔹 Priorizar la foto de perfil si hay una URL válida
      fotoPerfilUrl: this.userData.fotoPerfilUrl || '',
      iconoPerfilLocal: this.userData.fotoPerfilUrl ? '' : this.userData.iconoPerfilLocal
    };

    this.dbService.getCollectionByCustomparam('restaurantes', 'uid', prevUserData.uid)
      .pipe(take(1))
      .subscribe(userArray => {
        if (!userArray || userArray.length === 0) return;
        const userDoc = userArray[0];

        this.dbService.updateFireStoreDocument('restaurantes', userDoc.id, updatedData)
          .then(() => {
            localStorage.setItem('userData', JSON.stringify({ ...prevUserData, ...updatedData }));
            this.router.navigate(['/perfil-local-suscrito']);
          });
      });
  }
}
