import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  path: string;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.paramMap.get('path'))
    this.route.params.subscribe(routeParams => {
      this.path = routeParams.path
      console.log(this.path)
    });
  }

}
