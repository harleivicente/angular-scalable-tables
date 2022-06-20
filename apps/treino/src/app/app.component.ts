import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dados = new FonteDados();
  colunas = ['nome', 'idade'];
  items = data;

  constructor( ) {}

  ngOnInit() {}

  click() {
    this.colunas.push('idade');
  }

}

const data = [
  {
    nome: 'Harlei Vicente',
    idade: 31
  },
  {
    nome: 'Geovana Melo',
    idade: 26
  }
];

class FonteDados extends DataSource<any> {

  connect(): Observable<any[]> {
    return of(data);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    throw new Error('Method not implemented.');
  }

}
