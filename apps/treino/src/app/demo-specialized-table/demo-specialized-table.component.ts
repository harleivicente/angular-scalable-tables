import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecializedDataTableComponent, TreinoTableFilter } from '../specialized-data-table/specialized-data-table.component';
import { MockService } from '../mock.service';
import { PactoDataTableFilter, PactoDataTableResult } from '../data-table/data-table-state-manager';

@Component({
  selector: 'ui-demo-specialized-table',
  templateUrl: './demo-specialized-table.component.html',
  styleUrls: ['./demo-specialized-table.component.scss']
})
export class DemoSpecializedTableComponent implements OnInit {
  @ViewChild(SpecializedDataTableComponent, { static: true }) table: SpecializedDataTableComponent<any>;
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
