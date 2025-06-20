import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'bienvenida',
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
    path: 'historial/:id', // ✅ Agregamos ":id" como parámetro dinámico
    loadChildren: () => import('./pages/historial/historial.module').then(m => m.HistorialPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
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
  {
   path: 'resenas/:restauranteId', // ✅ Agregamos el parámetro restauranteId
    loadChildren: () => import('./pages/resenas/resenas.module').then(m => m.ResenasPageModule)
  },
  {
    path: 'sign-up-comercio',
    loadChildren: () => import('./pages/sign-up-comercio/sign-up-comercio.module').then( m => m.SignUpComercioPageModule)
  },
  {
    path: 'menu-local',
    loadChildren: () => import('./pages/menu-local/menu-local.module').then( m => m.MenuLocalPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./pages/bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'onboarding1',
    loadChildren: () => import('./pages/onboarding1/onboarding1.module').then( m => m.Onboarding1PageModule)
  },
  {
    path: 'onboarding2',
    loadChildren: () => import('./pages/onboarding2/onboarding2.module').then( m => m.Onboarding2PageModule)
  },
  {
    path: 'onboarding3',
    loadChildren: () => import('./pages/onboarding3/onboarding3.module').then( m => m.Onboarding3PageModule)
  },
  {
    path: 'onboardingf',
    loadChildren: () => import('./pages/onboardingf/onboardingf.module').then( m => m.OnboardingfPageModule)
  },
  {
    path: 'gamificacion',
    loadChildren: () => import('./pages/gamificacion/gamificacion.module').then( m => m.GamificacionPageModule)
  },
  {
  path: 'dejar-resena/:id',
  loadChildren: () => import('./pages/dejar-resena/dejar-resena.module').then( m => m.DejarResenaPageModule)
},
  {
    path: 'top-restaurantes',
    loadChildren: () => import('./pages/top-restaurantes/top-restaurantes.module').then( m => m.TopRestaurantesPageModule)
  },
  {
    path: 'misiones',
    loadChildren: () => import('./pages/misiones/misiones.module').then( m => m.MisionesPageModule)
  },
  {
    path: 'recompensas',
    loadChildren: () => import('./pages/recompensas/recompensas.module').then( m => m.RecompensasPageModule)
  },
  {
    path: 'evento-semanal',
    loadChildren: () => import('./pages/evento-semanal/evento-semanal.module').then( m => m.EventoSemanalPageModule)
  },



 






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
