import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroVisitantePage } from './registro-visitante.page';
import { provideHttpClient } from '@angular/common/http';
import { VisitorService } from '../services/visitor.service';

describe('RegistroVisitantePage', () => {
  let component: RegistroVisitantePage;
  let fixture: ComponentFixture<RegistroVisitantePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        VisitorService
      ],
      declarations: [RegistroVisitantePage]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistroVisitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
