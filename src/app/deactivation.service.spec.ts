import { TestBed } from '@angular/core/testing';

import { DeactivationService } from './deactivation.service';

describe('DeactivationService', () => {
  let service: DeactivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeactivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
