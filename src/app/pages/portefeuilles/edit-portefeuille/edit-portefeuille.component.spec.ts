import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPortefeuilleComponent } from './edit-portefeuille.component';

describe('EditPortefeuilleComponent', () => {
  let component: EditPortefeuilleComponent;
  let fixture: ComponentFixture<EditPortefeuilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPortefeuilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
