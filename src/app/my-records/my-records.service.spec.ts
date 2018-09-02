import { TestBed, inject } from '@angular/core/testing';

import { MyRecordsService } from './my-records.service';

describe('MyRecordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyRecordsService]
    });
  });

  it('should be created', inject([MyRecordsService], (service: MyRecordsService) => {
    expect(service).toBeTruthy();
  }));
});
