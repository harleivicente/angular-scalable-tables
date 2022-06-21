import { Component, OnInit, ViewChild } from '@angular/core';
import { SquareGameDirective } from '../square-game.directive';

@Component({
  selector: 'ui-ui-squares',
  templateUrl: './ui-squares.component.html',
  styleUrls: ['./ui-squares.component.scss']
})
export class UiSquaresComponent implements OnInit {
  @ViewChild(SquareGameDirective, { static: true }) game: SquareGameDirective;
  show = false;

  constructor() { }

  get gameTypes() {
    return Object.keys(this.game.points);
  }

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }


}
