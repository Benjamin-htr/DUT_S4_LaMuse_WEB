import { TestBed } from '@angular/core/testing';

import { GetResultService } from './get-result.service';

describe('GetResultService', () => {
  let service: GetResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
