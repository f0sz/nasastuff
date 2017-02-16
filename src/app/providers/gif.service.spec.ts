/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GifService } from './gif.service';

describe('GifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GifService]
    });
  });

  it('should ...', inject([GifService], (service: GifService) => {
    expect(service).toBeTruthy();
  }));
});
