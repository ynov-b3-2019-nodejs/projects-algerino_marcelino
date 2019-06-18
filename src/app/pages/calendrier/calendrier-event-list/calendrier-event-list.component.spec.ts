import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierEventListComponent } from './calendrier-event-list.component';

describe('CalendrierEventListComponent', () => {
  let component: CalendrierEventListComponent;
  let fixture: ComponentFixture<CalendrierEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
