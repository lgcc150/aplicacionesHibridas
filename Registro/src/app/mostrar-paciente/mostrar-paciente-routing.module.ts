import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarPacientePage } from './mostrar-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarPacientePageRoutingModule {}
