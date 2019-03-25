import { TestBed } from '@angular/core/testing';

import { IpGeoLocationService } from './ipgeolocation.service';

describe('IpGeoLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpGeoLocationService = TestBed.get(IpGeoLocationService);
    expect(service).toBeTruthy();
  });
});
