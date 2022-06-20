import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';



@Component({
  selector: 'thead[ui-table-head]',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})
export class TableHeadComponent implements OnInit {
  @Input() headers: TemplateRef<any>[] = [];
  @ViewChild('container', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.container.clear();
    this.headers.forEach(header => {
      this.container.createEmbeddedView(header);
    });
  }


}
