import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-demo-templates',
  templateUrl: './demo-templates.component.html',
  styleUrls: ['./demo-templates.component.scss']
})
export class DemoTemplatesComponent implements OnInit {
  @ViewChild('cardTemplate', { static: true }) cardTempamplate: TemplateRef<any>;
  @ViewChild('container', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  protected selectFormControl: FormControl = new FormControl(1);
  
  constructor() {}

  ngOnInit() {
    const numberOfCards = this.selectFormControl.value;
    this.updateCards(numberOfCards);

    this.selectFormControl.valueChanges.subscribe(number => {
      this.updateCards(number);
    });
  }
  
  private updateCards(numberOfCards: number) {
    this.container.clear();
    for (let index = 0; index < numberOfCards; index++) {
      this.container.createEmbeddedView(this.cardTempamplate, {
        index: index
      });
    }
  }

}
