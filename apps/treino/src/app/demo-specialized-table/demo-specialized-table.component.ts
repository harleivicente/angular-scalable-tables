import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecializedDataTableComponent, TreinoTableFilter } from '../specialized-data-table/specialized-data-table.component';
import { MockService } from '../mock.service';
import { PactoDataTableFilter, PactoDataTableResult, PactoDataTableState } from '../data-table/data-table-state-manager';
import { ShareHandlerFn } from '../specialized-data-table/export-provider.model';
import { of } from 'rxjs';
import { DataTableShareOptions } from '../specialized-table-export/specialized-table-export.component';
import { delay } from 'rxjs/operators';

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
    this.filterFormGroup.valueChanges.subscribe(filter => {
      this.table.updateFilter(filter);
    });
  }

  shareHandlerFactory(): ShareHandlerFn {
    return (shareOptions: DataTableShareOptions, state: PactoDataTableState<any>) => {
      return of({
        fileToDownload: 'https://relatiro.com/34sf32423',
        linkToOpen: null
      }).pipe(
        delay(100)
      );
    }
  } 

  filterUpdate(filter: TreinoTableFilter) {
    this.updateTable(filter);
  }

  private updateTable(filter: PactoDataTableFilter) {
    this.tableLoading = true;
    this.mock.getPeople(filter).subscribe(result => {
      this.tableLoading = false;
      this.tableData = result;
    });
  }

}


