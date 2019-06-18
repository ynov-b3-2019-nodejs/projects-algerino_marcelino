import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPortefeuilleComponent } from './detail-portefeuille.component';

describe('DetailPortefeuilleComponent', () => {
  let component: DetailPortefeuilleComponent;
  let fixture: ComponentFixture<DetailPortefeuilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPortefeuilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
