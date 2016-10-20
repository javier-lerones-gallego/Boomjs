/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouteNameService } from './route-name.service';

describe('Service: RouteName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteNameService]
    });
  });

  it('should ...', inject([RouteNameService], (service: RouteNameService) => {
    expect(service).toBeTruthy();
  }));
});
