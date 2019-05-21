import { TestBed } from '@angular/core/testing';

import { PortefeuilleService } from './portefeuille.service';

describe('PortefeuilleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortefeuilleService = TestBed.get(PortefeuilleService);
    expect(service).toBeTruthy();
  });
});
