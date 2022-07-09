import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() pessoa: string;
  @ContentChild(AvatarComponent, { static: true }) avatar: AvatarComponent;
  protected contador = 0;

  constructor() {}

  ngOnInit() {
    console.log(this.avatar);
  }

  protected showAvatar() {
    this.avatar.showAvatar();
  }

  protected hideAvatar() {
    this.avatar.hideAvatar();
  }

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
