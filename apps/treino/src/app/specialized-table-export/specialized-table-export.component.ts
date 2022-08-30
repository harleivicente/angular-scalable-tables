import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

enum ShareType {
  PDF = 'PDF',
  CSV = 'CSV',
  WHATSAPP = 'WHATSAPP'
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
    whatsapp: new FormControl(),
    type: new FormControl()
  });

  protected actionClick() {
    const options = this.formGroup.getRawValue() as DataTableShareOptions;
    this.confirm.emit(options);
  }

  ngOnInit() {

    this.formGroup.get('type').valueChanges.subscribe(value => {
      const number = this.formGroup.get('whatsapp');
      if (value !== 'whats') {
        number.disable();
      } else {
        number.enable();
      }
    });

  }

}
