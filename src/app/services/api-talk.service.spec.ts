import { TestBed } from '@angular/core/testing';

import { ApiTalkService } from './api-talk.service';

describe('ApiTalkService', () => {
  let service: ApiTalkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTalkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
