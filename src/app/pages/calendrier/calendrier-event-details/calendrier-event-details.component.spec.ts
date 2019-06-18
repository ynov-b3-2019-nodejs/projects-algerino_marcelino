import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierEventDetailsComponent } from './calendrier-event-details.component';

describe('CalendrierEventDetailsComponent', () => {
  let component: CalendrierEventDetailsComponent;
  let fixture: ComponentFixture<CalendrierEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
