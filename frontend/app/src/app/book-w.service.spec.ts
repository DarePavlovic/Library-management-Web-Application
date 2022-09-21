import { TestBed } from '@angular/core/testing';

import { BookWService } from './book-w.service';

describe('BookWService', () => {
  let service: BookWService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookWService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
