import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { VisitorService } from './visitor.service';

describe('VisitorService', () => {
  let service: VisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        VisitorService
      ]
    });
    service = TestBed.inject(VisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
