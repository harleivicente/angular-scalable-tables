import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledHtmlTableComponent } from './styled-html-table.component';

describe('StyledHtmlTableComponent', () => {
  let component: StyledHtmlTableComponent;
  let fixture: ComponentFixture<StyledHtmlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledHtmlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledHtmlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
