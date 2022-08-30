import { Observable } from "rxjs";
import { DataTableShareOptions } from "../specialized-table-export/specialized-table-export.component";
import { PactoDataTableState } from '../data-table/data-table-state-manager';

export interface ShareResult {
    fileToDownload?: string;
    linkToOpen?: string;
}

export type ShareHandlerFn = (
  shareOptions: DataTableShareOptions,
  state: PactoDataTableState<any>
) => Observable<ShareResult>;

