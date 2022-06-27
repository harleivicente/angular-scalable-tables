import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumnDirective } from "./table-column.directive";

export interface PactoDataTableState<T> {
    pageSize: number;
    totalPages: number;
    currentPage: number;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
    data: T[];
    loading: boolean;
    columnVisibility: { [columnId: string]: boolean };
}

export interface PactoDataTableFilter {
    pageSize: number;
    currentPage: number;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
}

export class PactoDataTableStateManager<T> {
    filterUpdate$: EventEmitter<PactoDataTableFilter> = new EventEmitter();
    state$: BehaviorSubject<PactoDataTableState<T>> = new BehaviorSubject({
        pageSize: 10,
        currentPage: 1,
        data: [],
        totalPages: null,
        orderBy: 'nome',
        orderDirection: 'ASC',
        loading: false,
        columnVisibility: {}
    });

    constructor() {}

    private get state() {
        return this.state$.value;
    }

    getCurrentFilter(): PactoDataTableFilter {
        const { 
            totalPages,
            data,
            ...filter 
        } = this.state;
        return filter;
    }

    patchState(state: Partial<PactoDataTableState<T>>) {
        this.state$.next({
          ...this.state,
          ...state
        });
    }

    setCurrentPage(currentPage: number) {
        const currentFilter = this.getCurrentFilter();
        this.filterUpdate$.emit({
          ...currentFilter,
          currentPage
        })
    }

    setPageSize(pageSize: number) {
        const currentFilter = this.getCurrentFilter();
        this.filterUpdate$.emit({
          ...currentFilter,
          pageSize,
          currentPage: 1
        });
    }

    setOrderState(orderBy: string, orderDirection: 'ASC' | 'DESC') {
        const currentFilter = this.getCurrentFilter();
        this.filterUpdate$.emit({
          ...currentFilter,
          orderBy,
          orderDirection,
          currentPage: 1
        });
    }

    initializeColumnConfig(columns: TableColumnDirective[]) {
        const columnVisibility = {};
        columns.forEach(column => {
            const initialVisibility = column.columnInitiallyVisible;
            columnVisibility[column.uiTableColumn] = initialVisibility;
        });
        this.patchState({
          columnVisibility
        });
    }

}