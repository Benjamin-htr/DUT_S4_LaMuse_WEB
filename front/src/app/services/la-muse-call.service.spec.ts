import { TestBed } from '@angular/core/testing';

import { LaMuseCallService } from './la-muse-call.service';

describe('LaMuseCallService', () => {
  let service: LaMuseCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaMuseCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
