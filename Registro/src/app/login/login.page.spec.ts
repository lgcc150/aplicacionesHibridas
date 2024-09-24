import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        provideHttpClient(),
        AuthService
      ],
      declarations: [LoginPage]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
