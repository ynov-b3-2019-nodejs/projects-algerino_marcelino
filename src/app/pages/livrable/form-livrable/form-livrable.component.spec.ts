import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLivrableComponent } from './form-livrable.component';

describe('FormLivrableComponent', () => {
  let component: FormLivrableComponent;
  let fixture: ComponentFixture<FormLivrableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLivrableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
