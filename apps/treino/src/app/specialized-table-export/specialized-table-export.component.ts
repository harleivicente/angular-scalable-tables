import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export enum ShareType {
  PDF = 'pdf',
  CSV = 'csv',
  WHATSAPP = 'whats'
}

export interface DataTableShareOptions {
  type: ShareType,
  whatsapp?: string
}

@Component({
  selector: 'ui-specialized-table-export',
  templateUrl: './specialized-table-export.component.html',
  styleUrls: ['./specialized-table-export.component.scss']
})
export class SpecializedTableExportComponent implements OnInit {
  @Output() confirm: EventEmitter<DataTableShareOptions> = new EventEmitter();

  constructor() {}

  formGroup = new FormGroup({
    type: new FormControl('pdf'),
    whatsapp: new FormControl(),
  });

  protected actionClick() {
    const options = this.formGroup.getRawValue() as DataTableShareOptions;
    this.confirm.emit(options);
  }

  ngOnInit() {
    this.updateWhatsupState();
    this.formGroup.get('type').valueChanges.subscribe(() => {
      this.updateWhatsupState();
    });
  }

  private updateWhatsupState() {
    const formGroup = this.formGroup;
    const numberFormControl = formGroup.get('whatsapp');
    const type = formGroup.get('type').value;
    if (type !== 'whats') {
      numberFormControl.disable();
    } else {
      numberFormControl.enable();
    }
  }

}
