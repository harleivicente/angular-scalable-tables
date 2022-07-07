import { Component, OnInit } from '@angular/core';
import { PactoDataTableFilter, PactoDataTableStateManager } from '../data-table/data-table-state-manager';
import { MockService } from '../mock.service';

@Component({
  selector: 'ui-demo-styled-data-table',
  templateUrl: './demo-styled-data-table.component.html',
  styleUrls: ['./demo-styled-data-table.component.scss']
})
export class DemoStyledDataTableComponent implements OnInit {

  tableState: PactoDataTableStateManager<any> = new PactoDataTableStateManager();

  constructor(private mock: MockService) { }

  ngOnInit() {
    this.updateTable({ currentPage: 1, pageSize: 10 });

    this.tableState.update$.subscribe((filter: PactoDataTableFilter) => {
      this.updateTable(filter);
    });

  }

  private updateTable(tableFilter: PactoDataTableFilter) {
    this.tableState.patchState({ loading: true });
    this.mock.getPeople(tableFilter).subscribe(result => {
      this.tableState.patchState({
        ...result,
        loading: false 
      });
    });
  }

}
