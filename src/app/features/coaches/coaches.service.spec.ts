import { TestBed } from '@angular/core/testing';

import { CoachesService } from './coaches.service';

describe('CoachesService', () => {
  let service: CoachesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
