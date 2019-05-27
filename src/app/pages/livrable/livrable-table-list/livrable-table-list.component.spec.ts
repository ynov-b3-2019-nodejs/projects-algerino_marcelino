import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableTableListComponent } from './livrable-table-list.component';

describe('LivrableTableListComponent', () => {
  let component: LivrableTableListComponent;
  let fixture: ComponentFixture<LivrableTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrableTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrableTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
