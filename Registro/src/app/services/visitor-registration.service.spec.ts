import { TestBed } from '@angular/core/testing';
import { VisitorRegistrationService } from './visitor-registration.service';
import { provideHttpClient } from '@angular/common/http';


describe('VisitorRegistrationService', () => {
  let service: VisitorRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        VisitorRegistrationService
      ]
    });
    service = TestBed.inject(VisitorRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
