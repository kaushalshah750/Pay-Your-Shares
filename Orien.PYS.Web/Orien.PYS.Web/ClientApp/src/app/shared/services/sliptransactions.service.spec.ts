import { TestBed } from '@angular/core/testing';

import { SliptransactionsService } from './sliptransactions.service';

describe('SliptransactionsService', () => {
  let service: SliptransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliptransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
