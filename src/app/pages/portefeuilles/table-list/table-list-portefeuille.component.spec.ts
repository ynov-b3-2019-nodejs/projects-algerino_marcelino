import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListPortefeuilleComponent } from './table-list-portefeuille.component';

describe('TableListPortefeuilleComponent', () => {
  let component: TableListPortefeuilleComponent;
  let fixture: ComponentFixture<TableListPortefeuilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListPortefeuilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListPortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
