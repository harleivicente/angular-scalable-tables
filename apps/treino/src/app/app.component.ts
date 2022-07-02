import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PactoDataTableFilter, PactoDataTableResult } from './data-table-state-manager';
import { DataTableComponent } from './data-table/data-table.component';
import { MockService } from './mock.service';

@Component({
  selector: 'ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  filterUpdate(filter: PactoDataTableFilter) {
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


