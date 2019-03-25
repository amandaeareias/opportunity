import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private category$ = new BehaviorSubject<string>('All');
  cast = this.category$.asObservable();

  constructor() { }

  ngOnInit() {
  }

  categoryChanged(event) {
    this.category$.next(event)
  }

}
