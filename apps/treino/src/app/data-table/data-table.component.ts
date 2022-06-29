import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PactoDataTableFilter } from '../data-table-state-manager';
import { DataTableDirective } from '../data-table.directive';
import { Filter, MockService, Person } from '../mock.service';

@Component({
  selector: 'ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true }) dataTable: DataTableDirective<Person>;

  constructor(private mockService: MockService) {}

  show = false;

  ngOnInit() {
    const initialFilter: Filter = {
      currentPage: 1,
      pageSize: 10
    };
    this.updateTableData(initialFilter);
  }

  filterUpdate(filter: PactoDataTableFilter) {
    this.updateTableData(filter);
  }
  
  private updateTableData(filter) {
    this.dataTable.stateManager.patchState({ loading: true });
    this.mockService.getPeople(filter).subscribe(result => {
      this.dataTable.stateManager.patchState({
        ...result,
        loading: false
      });
    });
  }

}
