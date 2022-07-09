import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() pessoa: string;
  protected contador = 0;

  constructor() {}

  ngOnInit() {}

  get valorAtual() {
    return this.contador;
  }

  public reset() {
    this.contador = 0;
  }

  protected incrementar() {
    this.contador = this.contador + 1;
  }

}
