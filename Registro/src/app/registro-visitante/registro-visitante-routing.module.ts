import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroVisitantePage } from './registro-visitante.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroVisitantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroVisitantePageRoutingModule {}
