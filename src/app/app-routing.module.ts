import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'puntos',
    loadChildren: () => import('./pages/puntos/puntos.module').then( m => m.PuntosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'homeusuario',
    loadChildren: () => import('./pages/homeusuario/homeusuario.module').then( m => m.HomeusuarioPageModule)
  },
  {
    path: 'homelocal',
    loadChildren: () => import('./pages/homelocal/homelocal.module').then( m => m.HomelocalPageModule)
  },

  {
    path: 'forgot-pasword',
    loadChildren: () => import('./pages/forgot-pasword/forgot-pasword.module').then( m => m.ForgotPaswordPageModule)
  },
  {
  path: 'restaurante-detalle/:id', // Se agrega ":id" como parámetro dinámico
  loadChildren: () => import('./pages/restaurante-detalle/restaurante-detalle.module').then(m => m.RestauranteDetallePageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'perfil-local-suscrito',
    loadChildren: () => import('./pages/perfil-local-suscrito/perfil-local-suscrito.module').then( m => m.PerfilLocalSuscritoPageModule)
  },
  {
    path: 'perfil-local-no-suscrito',
    loadChildren: () => import('./pages/perfil-local-no-suscrito/perfil-local-no-suscrito.module').then( m => m.PerfilLocalNoSuscritoPageModule)
  },
  {
    path: 'edit-perfilc',
    loadChildren: () => import('./pages/edit-perfilc/edit-perfilc.module').then( m => m.EditPerfilcPageModule)
  },
  {
    path: 'preferencias',
    loadChildren: () => import('./pages/preferencias/preferencias.module').then( m => m.PreferenciasPageModule)
  },
  {
    path: 'signin-comercio',
    loadChildren: () => import('./pages/signin-comercio/signin-comercio.module').then( m => m.SigninComercioPageModule)
  },
  {
    path: 'editar-local',
    loadChildren: () => import('./pages/editar-local/editar-local.module').then( m => m.EditarLocalPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
