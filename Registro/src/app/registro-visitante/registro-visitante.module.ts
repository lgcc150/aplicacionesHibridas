import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroVisitantePageRoutingModule } from './registro-visitante-routing.module';

import { RegistroVisitantePage } from './registro-visitante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroVisitantePageRoutingModule
  ],
  declarations: [RegistroVisitantePage]
})
export class RegistroVisitantePageModule {}
