import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  ngOnInit() {}

  public showAvatar() {
    this.elementRef.nativeElement.hidden = false;
  }

  public hideAvatar() {
    this.elementRef.nativeElement.hidden = true;
  }

}
