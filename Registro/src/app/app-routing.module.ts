import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa el guardia de rutas


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard] // Protege esta ruta con el guardia
  },
  
  {
    path: 'mostrar-paciente',
    loadChildren: () => import('./mostrar-paciente/mostrar-paciente.module').then( m => m.MostrarPacientePageModule),canActivate: [AuthGuard] // Protege esta ruta con el guardia
  },
  {
    path: 'registro-visitante',
    loadChildren: () => import('./registro-visitante/registro-visitante.module').then( m => m.RegistroVisitantePageModule), canActivate: [AuthGuard] // Protege esta ruta con el guardia
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
