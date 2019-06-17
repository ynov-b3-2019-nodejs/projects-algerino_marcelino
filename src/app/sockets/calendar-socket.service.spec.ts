import { TestBed } from '@angular/core/testing';

import { CalendarSocketService } from './calendar-socket.service';

describe('CalendarSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarSocketService = TestBed.get(CalendarSocketService);
    expect(service).toBeTruthy();
  });
});
