import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  constructor() { }

  cloud1;
  cloud2;
  cloud3;
  cloud4;
  cloud5;

  ngOnInit() {
    window.onscroll = this.scroll;
  }

  scroll = (): void => {
    if (window.pageYOffset < window.innerHeight) {
      this.cloud1 = { 'transform': 'translateY(' + -window.pageYOffset/2 + '%)' }
      this.cloud2 = { 'transform': 'translateY(' + window.pageYOffset/4 + '%)' }
      this.cloud3 = { 'transform': 'translateY(' + -window.pageYOffset/3 + '%)' }
      this.cloud4 = { 'transform': 'translateY(' + window.pageYOffset/2 + '%)' }
      this.cloud5 = { 'transform': 'translateY(' + -window.pageYOffset/2 + '%)' }
    } else {
      this.cloud1 = { 'transform': 'translateY(0)' }
    }

  }

}
