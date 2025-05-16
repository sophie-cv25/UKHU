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



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
