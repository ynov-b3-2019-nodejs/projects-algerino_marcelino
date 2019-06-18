import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUserCreateComponent } from './popup-user-create.component';

describe('PopupUserCreateComponent', () => {
  let component: PopupUserCreateComponent;
  let fixture: ComponentFixture<PopupUserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUserCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
