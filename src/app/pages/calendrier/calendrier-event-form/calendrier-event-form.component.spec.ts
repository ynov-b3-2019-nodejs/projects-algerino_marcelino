import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierEventFormComponent } from './calendrier-event-form.component';

describe('CalendrierEventFormComponent', () => {
  let component: CalendrierEventFormComponent;
  let fixture: ComponentFixture<CalendrierEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
