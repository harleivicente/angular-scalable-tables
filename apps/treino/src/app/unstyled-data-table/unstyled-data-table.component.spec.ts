import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnstyledDataTableComponent } from './unstyled-data-table.component';

describe('UnstyledDataTableComponent', () => {
  let component: UnstyledDataTableComponent;
  let fixture: ComponentFixture<UnstyledDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnstyledDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnstyledDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
