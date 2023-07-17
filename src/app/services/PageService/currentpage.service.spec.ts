import { TestBed } from '@angular/core/testing';

import { CurrentpageService } from './currentpage.service';

describe('CurrentpageService', () => {
  let service: CurrentpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
