import { Component, OnInit, ViewChild } from '@angular/core';
import { PactoDataTableFilter, PactoDataTableStateManager } from '../data-table-state-manager';
import { DataTableDirective } from '../data-table.directive';
import { MockService, Person } from '../mock.service';

@Component({
  selector: 'ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [PactoDataTableStateManager]
})
export class DataTableComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true }) dataTable: DataTableDirective<Person>;

  constructor(
    private mockService: MockService,
    public stateManager: PactoDataTableStateManager<any>
  ) {}

  ngOnInit() {

    this.stateManager.initializeColumnConfig([
      { id: "nome", initiallyVisible: true },
      { id: "idade", initiallyVisible: true },
      { id: "cpf", initiallyVisible: true }
    ]);

    this.stateManager.filterUpdate$.subscribe((filter: PactoDataTableFilter) => {
      this.updateTableData(filter);
    });

    this.updateTableData({ currentPage: 1, pageSize: 10 });
  }

  getSort(columnId){
      return this.stateManager.getSortDirection(columnId);
  }

  private updateTableData(filter) {
    this.stateManager.patchState({ loading: true });
    this.mockService.getPeople(filter).subscribe(result => {
      this.stateManager.patchState({
        ...result,
        loading: false
      });
    });
  }

}
