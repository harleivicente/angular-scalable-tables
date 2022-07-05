import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface PureTableState {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: any[];
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
  columns: { id: string, visible: boolean }[];
}

export interface DataRequestResponse {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: any[];
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
}

export interface DataRequestFilter {
  pageSize: number;
  currentPage: number;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
}

const data = [
  {
    nome: 'Teste 1',
    idade: 31,
    cpf: '123.454.343-54'
  },
  {
    nome: 'Teste 2',
    idade: 26,
    cpf: '123.454.343-54'
  }
];

@Component({
  selector: 'ui-demo-pure-table',
  templateUrl: './demo-pure-table.component.html',
  styleUrls: ['./demo-pure-table.component.scss']
})
export class DemoPureTableComponent implements OnInit {

  pureTableState$: BehaviorSubject<PureTableState> = new BehaviorSubject({
    currentPage: 1,
    totalPages: 10,
    pageSize: 5,
    data,
    orderBy: null,
    orderDirection: null,
    columns: [
      { id: 'nome', visible: true },
      { id: 'idade', visible: true },
      { id: 'cpf', visible: true }
    ]
  });

  constructor() {}

  ngOnInit() {}

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

    this.fetchData(updatedRequest).subscribe(dataResponse => {
      this.patchTableState(dataResponse);
    });
  }

  patchTableState(statePatch: Partial<PureTableState>) {
    const currentState = this.state;
    this.pureTableState$.next({
      ...currentState,
      ...statePatch
    });
  }

  fetchData(request: DataRequestFilter): Observable<DataRequestResponse> {
    return of({
      ...request,
      totalPages: 10,
      data
    });
  }

}
