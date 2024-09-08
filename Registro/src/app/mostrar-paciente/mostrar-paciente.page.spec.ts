import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarPacientePage } from './mostrar-paciente.page';

describe('MostrarPacientePage', () => {
  let component: MostrarPacientePage;
  let fixture: ComponentFixture<MostrarPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
