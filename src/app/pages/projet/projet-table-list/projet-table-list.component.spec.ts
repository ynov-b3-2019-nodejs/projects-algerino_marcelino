import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetTableListComponent } from './projet-table-list.component';

describe('ProjetTableListComponent', () => {
  let component: ProjetTableListComponent;
  let fixture: ComponentFixture<ProjetTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
