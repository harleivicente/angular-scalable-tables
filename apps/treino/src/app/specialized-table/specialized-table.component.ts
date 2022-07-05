import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PactoDataTableFilter, PactoDataTableResult } from '../data-table-state-manager';
import { DataTableComponent, TreinoTableFilter } from '../data-table/data-table.component';
import { MockService } from '../mock.service';

@Component({
  selector: 'ui-specialized-table',
  templateUrl: './specialized-table.component.html',
  styleUrls: ['./specialized-table.component.scss']
})
export class SpecializedTableComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true }) table: DataTableComponent<any>;
  tableData: PactoDataTableResult<any>;
  tableLoading;
  filterFormGroup: FormGroup = new FormGroup({
    'tipo': new FormControl(),
    'status': new FormControl()
  });

  constructor(private mock: MockService) {}

  ngOnInit() {
    const initialFilter: PactoDataTableFilter = { 
      currentPage: 1,
      pageSize: 10,
      orderBy: 'nome',
      orderDirection: 'ASC'
    };
    this.updateTable(initialFilter);

    this.filterFormGroup.valueChanges.subscribe(filter => {
      this.table.updateFilter(filter);
    });
  }

  filterUpdate(filter: TreinoTableFilter) {
    this.updateTable(filter);
  }

  share() {
    alert('share')
  }

  private updateTable(filter: PactoDataTableFilter) {
    this.tableLoading = true;
    this.mock.getPeople(filter).subscribe(result => {
      this.tableLoading = false;
      this.tableData = result;
    });
  }

}
