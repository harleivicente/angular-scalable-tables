import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('[abc]', {  static: true }) abc;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      console.log(this.abc);
    }, 3000);
  }


}


