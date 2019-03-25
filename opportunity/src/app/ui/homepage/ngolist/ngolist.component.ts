import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { categoriesList } from '../../../data/listsofdata/categorieslist'
import { HomepageComponent } from '../homepage.component'

@Component({
  selector: 'app-ngolist',
  templateUrl: './ngolist.component.html',
  styleUrls: ['./ngolist.component.css']
})
export class NgolistComponent implements OnInit {

  ngos;
  categoriesList: string[] = categoriesList

  constructor(
    private service: FirebaseCrudService,
    private homePage: HomepageComponent,
  ) { }

  ngOnInit() {
    this.homePage.cast.subscribe(category => this.getNgos(category))
  }

  getNgos(category) {
    if(category == 'All') {
      this.service.getMany('ngos').subscribe(ngos => this.ngos = ngos)
    } else {
      this.service.getMany('ngos', (ref) => ref.where('category', '==', category)).subscribe(ngos => this.ngos = ngos)
    }
  }

}
