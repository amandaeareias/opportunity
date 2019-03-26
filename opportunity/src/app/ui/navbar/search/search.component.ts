import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseCrudService } from '../../../data/services/firebase.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newPath: string;
  ngosFound;
  opportunitiesFound;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fbService: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.newPath = routeParams.path
      this.checkPath()
    });
  }

  checkPath() {
    if(this.newPath.length <= 0) {
      this.router.navigate(['']);
    } else {
      this.fbService.searchByName('ngos', this.newPath).subscribe(result => this.ngosFound = result)
      this.fbService.searchByName('opportunities', this.newPath).subscribe(result => this.opportunitiesFound = result)
    }
  }

}
