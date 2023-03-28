import { TestBed } from '@angular/core/testing';

import { HttpProgressService } from './http-progress.service';

describe('HttpProgressService', () => {
  let service: HttpProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
