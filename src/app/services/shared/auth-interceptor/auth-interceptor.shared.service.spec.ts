import { TestBed } from '@angular/core/testing';

import { AuthInterceptorSharedService } from './auth-interceptor.shared.service';

describe('AuthInterceptorSharedService', () => {
  let service: AuthInterceptorSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptorSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
