import { AfterViewInit, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, ViewContainerRef } from '@angular/core';
import { SquareDirective } from './square.directive';

@Directive({
  selector: '[uiSquareGame]'
})
export class SquareGameDirective implements OnInit, AfterViewInit {
  @ContentChildren(SquareDirective) squares: QueryList<SquareDirective>;
  points = {};

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef
  ) {}

  patchPoints(type, points) {
    if (!this.points[type]) {
      this.points[type] = 0;
    }
    this.points[type] = this.points[type] + points;
  }

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.renderSquares(this.squares.toArray());
    this.squares.changes.subscribe(
      squares => {
        this.renderSquares(squares.toArray());
      }
    );
  }

  private renderSquares(squares: SquareDirective[]) {
    this.viewContainerRef.clear();
    const gameContainerElementRef = this.elementRef.nativeElement;

    squares.forEach(square => {

        const viewRef = this.viewContainerRef.createEmbeddedView(square.template);
        const newSquareRef = viewRef.rootNodes[0];
        gameContainerElementRef.insertBefore(
          newSquareRef,
          gameContainerElementRef.lastChild
        );

      }
    );
  }

}
