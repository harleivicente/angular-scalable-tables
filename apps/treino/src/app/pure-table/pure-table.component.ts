import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface PureTableState {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: any[];
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
}

export interface DataRequest {
  pageSize: number;
  currentPage: number;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
}

const data = [
  {
    nome: 'Harlei Vicente',
    idade: 31
  },
  {
    nome: 'Geovana Melo',
    idade: 26
  }
];

@Component({
  selector: 'ui-pure-table',
  templateUrl: './pure-table.component.html',
  styleUrls: ['./pure-table.component.scss']
})
export class PureTableComponent implements OnInit {

  pureTableState$: BehaviorSubject<PureTableState> = new BehaviorSubject({
    currentPage: 1,
    totalPages: 10,
    pageSize: 5,
    data,
    orderBy: null,
    orderDirection: null
  });

  constructor() {}

  ngOnInit() {}

  get state() {
    return this.pureTableState$.value;
  }

  refetchData(params: Partial<DataRequest>) {
    const currentRequest = {
      pageSize: this.state.pageSize,
      currentPage: this.state.currentPage,
      orderBy: this.state.orderBy,
      orderDirection: this.state.orderDirection
    };

    const updatedRequest = {
      ...currentRequest,
      ...params
    };

    this.fetchData(updatedRequest).subscribe(result => {
      this.pureTableState$.next(result);
    });
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

  fetchData(request: DataRequest): Observable<PureTableState> {
    return of({
      ...request,
      totalPages: 10,
      data
    });
  }

}
