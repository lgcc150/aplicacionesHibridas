import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarPacientePage } from './mostrar-paciente.page';
import { provideHttpClient } from '@angular/common/http';
import { VisitorService } from '../services/visitor.service';

describe('MostrarPacientePage', () => {
  let component: MostrarPacientePage;
  let fixture: ComponentFixture<MostrarPacientePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        VisitorService
      ],
      declarations: [MostrarPacientePage]
    }).compileComponents();
    fixture = TestBed.createComponent(MostrarPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
