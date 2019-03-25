import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { categoriesList } from '../../../data/listsofdata/categorieslist'

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
  ) { }

  ngOnInit() {
    this.getNgos()
  }

  getNgos() {
    this.service.getMany('ngos').subscribe(ngos => this.ngos = ngos)
  }

  changeone(event) {
    let target = event.target.value
    target === 'All' ? this.getNgos() : this.service.getMany('ngos', (ref) => ref.where('category', '==', target)).subscribe(ngos => this.ngos = ngos)
  }

}
