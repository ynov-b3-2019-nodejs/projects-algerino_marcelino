import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPortefeuilleComponent } from './form-portefeuille.component';

describe('FormPortefeuilleComponent', () => {
  let component: FormPortefeuilleComponent;
  let fixture: ComponentFixture<FormPortefeuilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPortefeuilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
