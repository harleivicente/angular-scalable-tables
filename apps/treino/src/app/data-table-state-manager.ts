import { EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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

export interface PactoTableConfig {
    id: string;
    initiallyVisible: boolean;
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
        this.filterUpdate$.emit({
          ...this.getCurrentFilter(),
          orderBy,
          orderDirection,
          currentPage: 1
        });
    }

    toggleSort(columnId: string) {
        const sortDirection = this.getSortDirection(columnId);
        this.filterUpdate$.emit({
            ...this.getCurrentFilter(),
            orderBy: columnId,
            orderDirection: sortDirection === 'ASC' ? 'DESC' : 'ASC'
        });
    }

    getSortDirection(columnId: string) {
        return this.state.orderBy === columnId ? this.state.orderDirection : null;
    }

    initializeColumnConfig(columns: PactoTableConfig[]) {
        const columnVisibility = {};
        columns.forEach(column => {
            const initialVisibility = column.initiallyVisible;
            columnVisibility[column.id] = initialVisibility;
        });
        this.patchState({
          columnVisibility
        });
    }

}