import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarPacientePageRoutingModule } from './mostrar-paciente-routing.module';

import { MostrarPacientePage } from './mostrar-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarPacientePageRoutingModule
  ],
  declarations: [MostrarPacientePage]
})
export class MostrarPacientePageModule {}
