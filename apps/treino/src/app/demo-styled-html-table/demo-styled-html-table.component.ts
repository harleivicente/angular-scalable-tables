import { Component, OnInit } from '@angular/core';
import { CellAction } from '../cell-action.directive';

@Component({
  selector: 'ui-styled-html-table',
  templateUrl: './demo-styled-html-table.component.html',
  styleUrls: ['./demo-styled-html-table.component.scss']
})
export class DemoStyledHtmlTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  get CellAction() {
    return CellAction;
  }

}
