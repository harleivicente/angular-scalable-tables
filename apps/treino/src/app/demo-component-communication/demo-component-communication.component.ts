import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'ui-demo-component-communication',
  templateUrl: './demo-component-communication.component.html',
  styleUrls: ['./demo-component-communication.component.scss']
})
export class DemoComponentCommunicationComponent implements OnInit {
  @ViewChildren(CardComponent) cards: QueryList<CardComponent>;

  constructor() {}

  pessoas = ["Bruno", "Marcio", "Ana"];

  ngOnInit() {}

  get contadorTotal() {
    let total = 0;
    
    if (!this.cards) {
      return 0;
    }

    this.cards.forEach(card => {
      total = total + card.valorAtual;
    });
    return total;
  }

  adicionarPessoa() {
    const id = Math.trunc(Math.random() * 100);
    this.pessoas.push(`Pessoa #${id}`)
  }

  resetarTodosCards() {
    this.cards.forEach(card => {
      card.reset();
    });
  }

}
