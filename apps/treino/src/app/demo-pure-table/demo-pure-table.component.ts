import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MockService, Person } from '../mock.service';


export interface PureTableState {
  pageSize: number;
  totalItems: number;
  currentPage: number;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
  data: Person[];
  columns: { id: string, visible: boolean }[];
}

export interface DataRequestResponse {
  pageSize: number;
  totalItems: number;
  currentPage: number;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
  data: Person[];
}

export interface DataRequestFilter {
  pageSize: number;
  currentPage: number;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
}

@Component({
  selector: 'ui-demo-pure-table',
  templateUrl: './demo-pure-table.component.html',
  styleUrls: ['./demo-pure-table.component.scss']
})
export class DemoPureTableComponent implements OnInit {

  pureTableState$: BehaviorSubject<PureTableState> = new BehaviorSubject({
    currentPage: 1,
    totalItems: 0,
    pageSize: 10,
    data: [],
    orderBy: null,
    orderDirection: null,
    columns: [
      { id: 'nome', visible: true },
      { id: 'idade', visible: true },
      { id: 'cpf', visible: true }
    ]
  });

  constructor(private mock: MockService) {}

  ngOnInit() {
    this.mock.getPeople({ currentPage: 1, pageSize: 10 }).subscribe(response => {
      this.patchTableState(response);
    });
  }

  get state() {
    return this.pureTableState$.value;
  }

  isColumnVisible(id) {
    return this.state.columns.find(column => column.id === id).visible;
  }

  updateColumnVisibily(columnId, visible) {
    const columns = Object.assign([], this.state.columns);
    columns.forEach(column => {
      if (column.id === columnId) {
        column.visible = visible;
      }
    });
    this.patchTableState({ columns });
  }

  changeOrder(column) {
    if (this.state.orderBy === column && this.state.orderDirection === 'ASC') {
      this.refetchData({
        orderDirection: 'DESC',
        currentPage: 1
      });
    } else if (this.state.orderBy === column && this.state.orderDirection === 'ASC') {
      this.refetchData({
        orderDirection: 'ASC',
        currentPage: 1
      });
    } else {
      this.refetchData({
        orderBy: column,
        orderDirection: 'ASC',
        currentPage: 1
      });
    }
  }

  changeCurrentPage(page) {
    this.refetchData({
      currentPage: page
    })
  }

  changePageSize(size) {
    this.refetchData({
      currentPage: 1,
      pageSize: size
    })
  }

  refetchData(params: Partial<DataRequestFilter>) {

    const {
      pageSize,
      currentPage,
      orderBy,
      orderDirection
    } = this.state;

    const updatedRequest = {
        pageSize,
        currentPage,
        orderBy,
        orderDirection,
      ...params
    };

    this.mock.getPeople(updatedRequest).subscribe(response => {
      this.patchTableState(response);
    });
  }

  patchTableState(statePatch: Partial<PureTableState>) {
    const currentState = this.state;
    this.pureTableState$.next({
      ...currentState,
      ...statePatch
    });
  }

}
