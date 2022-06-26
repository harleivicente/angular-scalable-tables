import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface PactoDataTableState<T> {
    pageSize: number;
    totalPages: number;
    currentPage: number;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
    data: T[];
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
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        data: [],
        orderBy: null,
        orderDirection: null
    });

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
    



}