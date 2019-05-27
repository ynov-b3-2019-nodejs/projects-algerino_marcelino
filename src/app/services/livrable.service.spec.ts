import { TestBed } from '@angular/core/testing';

import { LivrableService } from './livrable.service';

describe('LivrableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivrableService = TestBed.get(LivrableService);
    expect(service).toBeTruthy();
  });
});
