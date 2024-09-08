import { TestBed } from '@angular/core/testing';

import { VisitorRegistrationService } from './visitor-registration.service';

describe('VisitorRegistrationService', () => {
  let service: VisitorRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
