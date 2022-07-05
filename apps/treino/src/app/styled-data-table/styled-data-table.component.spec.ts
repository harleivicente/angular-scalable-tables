import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledDataTableComponent } from './styled-data-table.component';

describe('StyledDataTableComponent', () => {
  let component: StyledDataTableComponent;
  let fixture: ComponentFixture<StyledDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
