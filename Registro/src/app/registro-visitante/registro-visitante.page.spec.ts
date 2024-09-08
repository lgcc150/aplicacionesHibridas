import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroVisitantePage } from './registro-visitante.page';

describe('RegistroVisitantePage', () => {
  let component: RegistroVisitantePage;
  let fixture: ComponentFixture<RegistroVisitantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVisitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
