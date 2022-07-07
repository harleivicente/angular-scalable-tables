import { AfterViewInit, ContentChildren, Directive, ElementRef, OnInit, QueryList } from '@angular/core';
import { RowStyleDirective } from './row-style.directive';

@Directive({
  selector: '[ui-table-style]',

})
export class StyledTableDirective implements OnInit, AfterViewInit {
  @ContentChildren(RowStyleDirective) bodyRows: QueryList<RowStyleDirective>;

  constructor(private elementRef: ElementRef) {}

  private tableCss = `
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width: calc(100% - 30px);
    margin: 15px;
  `;

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute("style", this.tableCss);
  }

  ngAfterViewInit() {
    this.updateRowStyles();
    this.bodyRows.changes.subscribe(() => {
      this.updateRowStyles();
    });
  }

  private updateRowStyles() {
    this.bodyRows.forEach((row, index) => {
      const even = index % 2 === 0;
      if (even) {
        row.setAsDarker();
      }
    });
  }


}
