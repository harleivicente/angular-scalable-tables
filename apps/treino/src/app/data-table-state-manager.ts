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

export interface PactoDataTableResult<T> {
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

export interface PactoTableConfig {
    id: string;
    initiallyVisible: boolean;
}

export class PactoDataTableStateManager<T> {
    update$: EventEmitter<PactoDataTableFilter> = new EventEmitter();
    state$: BehaviorSubject<PactoDataTableState<T>> = new BehaviorSubject({
        pageSize: 10,
        currentPage: 1,
        data: [],
        totalPages: null,
        orderBy: null,
        orderDirection: null,
        loading: false,
        columnVisibility: {}
    });

    constructor() {}

    private get state() {
        return this.state$.value;
    }

    private getSortDirection(columnId: string) {
        return this.state.orderBy === columnId ? this.state.orderDirection : null;
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

    triggerPageNumberChange(currentPage: number) {
        const currentFilter = this.getCurrentFilter();
        this.update$.emit({
          ...currentFilter,
          currentPage
        })
    }

    triggerPageSizeChange(pageSize: number) {
        const currentFilter = this.getCurrentFilter();
        this.update$.emit({
          ...currentFilter,
          pageSize,
          currentPage: 1
        });
    }

    triggerSortChange(orderBy: string, orderDirection: 'ASC' | 'DESC') {
        this.update$.emit({
          ...this.getCurrentFilter(),
          orderBy,
          orderDirection,
          currentPage: 1
        });
    }

    triggerSortToggle(columnId: string) {
        const currentSortDirection = this.getSortDirection(columnId);
        this.update$.emit({
            ...this.getCurrentFilter(),
            orderBy: columnId,
            orderDirection: currentSortDirection === 'ASC' ? 'DESC' : 'ASC'
        });
    }

    initializeColumnConfig(columns: PactoTableConfig[]) {
        const columnVisibility = {};
        columns.forEach(({ id, initiallyVisible }) => {
            columnVisibility[id] = initiallyVisible;
        });
        this.patchState({ columnVisibility });
    }

    showAllColumns() {
        const columns = Object.keys(this.state.columnVisibility);
        const columnVisibility = {};
        columns.forEach(column => {
            columnVisibility[column] = true;
        });
        this.patchState({ columnVisibility });
    }

}