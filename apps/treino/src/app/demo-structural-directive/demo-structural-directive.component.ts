import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SimpleCardDirective } from './simple-card.directive';

@Component({
  selector: 'ui-demo-structural-directive',
  templateUrl: './demo-structural-directive.component.html',
  styleUrls: ['./demo-structural-directive.component.scss']
})
export class DemoStructuralDirectiveComponent implements OnInit {
  @ViewChild(SimpleCardDirective, { static: true }) cardTemplate: SimpleCardDirective;
  @ViewChild(
    'cardOutlet',
    { static: true, read: ViewContainerRef }
  ) cardOutlet: ViewContainerRef;

  pessoas =  ["Pessoa A", "Pessoa B", "Pessoa C"];

  constructor() { }

  ngOnInit() {
    const cardTemplate = this.cardTemplate.templateRef;

    this.pessoas.forEach(pessoa => {
      this.cardOutlet.createEmbeddedView(cardTemplate, {
        $implicit: pessoa
      });
    });
  }

}
