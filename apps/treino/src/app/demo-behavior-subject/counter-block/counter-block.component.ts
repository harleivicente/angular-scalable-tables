import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Evento } from '../demo-behavior-subject.component';

@Component({
  selector: 'ui-counter-block',
  templateUrl: './counter-block.component.html',
  styleUrls: ['./counter-block.component.scss']
})
export class CounterBlockComponent implements OnInit {
  @Input() events$: BehaviorSubject<Evento>;
  selectFormControl = new FormControl(1);

  private colors = [
    "#34aac4",
    "#9400ff",
    "#1d38f2",
    "#86cd20",
    "#df6ce1",
    "#d59b12",
    "#33322f",
    "#6382f1"
  ];

  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  ngOnInit() {
    this.randomizeBackgroundColor();
    this.events$.subscribe(() => {
      this.randomizeBackgroundColor();
    });
  }

  clickHandler() {
    const atual = this.events$.value.valor;
    const incremento = parseInt(this.selectFormControl.value, 10);

    this.events$.next({
      valor: atual + incremento
    })
  }
  
  private randomizeBackgroundColor() {
    const randomColor = this.getRandomColor();
    this.elementRef.nativeElement.style.backgroundColor = randomColor;
  }

  private getRandomColor() {
    const randomNumber = Math.random() * 10;
    const randomInteger = Math.trunc(randomNumber);
    const colorIndex = randomInteger % this.colors.length;
    return this.colors[colorIndex];
  }

}
