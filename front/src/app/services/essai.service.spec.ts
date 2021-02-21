import { TestBed } from '@angular/core/testing';

import { EssaiService } from './essai.service';

describe('EssaiService', () => {
  let service: EssaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EssaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
