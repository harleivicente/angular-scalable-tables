import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, PactoDataTableFilter } from '../data-table.directive';
import { Filter, MockService } from '../mock.service';

@Component({
  selector: 'ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true }) dataTable: DataTableDirective<Person>;

  constructor(private mockService: MockService) {}

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
    this.mockService.getPeople(filter).subscribe(result => {
      this.dataTable.patchState(result);
    });
  }

}
