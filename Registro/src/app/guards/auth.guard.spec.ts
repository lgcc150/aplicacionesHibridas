import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        AuthService,
        AuthGuard
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
