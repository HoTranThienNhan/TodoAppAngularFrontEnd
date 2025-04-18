import { TestBed } from '@angular/core/testing';

import { AlertSharedService } from './alert.shared.service';

describe('AlertSharedService', () => {
  let service: AlertSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
