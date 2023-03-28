import { TestBed } from '@angular/core/testing';

import { ConfigInterceptor } from './config.interceptor';

describe('ConfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ConfigInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ConfigInterceptor = TestBed.inject(ConfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
