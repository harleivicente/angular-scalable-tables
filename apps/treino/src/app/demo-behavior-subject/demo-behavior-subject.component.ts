import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Evento {
  valor: number;
}

@Component({
  selector: 'ui-demo-behavior-subject',
  templateUrl: './demo-behavior-subject.component.html',
  styleUrls: ['./demo-behavior-subject.component.scss']
})
export class DemoBehaviorSubjectComponent implements OnInit {

  contador$: BehaviorSubject<Evento> = new BehaviorSubject({ valor: 0 });

  numeroCards = new Array(12).fill(0);

  constructor() {}

  ngOnInit() {}

}
