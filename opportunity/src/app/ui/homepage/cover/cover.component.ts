import { Component, OnInit } from '@angular/core';

const translateY = (factor) => ({
  transform: `translateY(${window.pageYOffset / factor}%)`
});

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
      this.cloud1 = {};
      this.cloud2 = translateY(4);
      this.cloud3 = translateY(-3);
      this.cloud4 = translateY(2);
      this.cloud5 = translateY(-2);
    } else {
      this.cloud1 = { transform: 'translateY(0)' };
    }

  }

}
