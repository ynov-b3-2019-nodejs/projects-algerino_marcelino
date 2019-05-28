import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableDetailComponent } from './livrable-detail.component';

describe('LivrableDetailComponent', () => {
  let component: LivrableDetailComponent;
  let fixture: ComponentFixture<LivrableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
