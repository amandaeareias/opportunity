import { Component, OnInit } from '@angular/core';
import { FirebaseCrudService } from '../../data/services/firebase.service'

@Component({
  selector: 'app-all-ngos',
  templateUrl: './all-ngos.component.html',
  styleUrls: ['./all-ngos.component.css']
})
export class AllNgosComponent implements OnInit {

  ngos;

  displayNgoListOnAll = {
    'margin-top': '40px',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'center',
    'justify-content': 'center',
    'width': '100vw',
  }

  constructor(
    private service: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.getNgos()
  }

  getNgos() {
    this.service.getMany('ngos').subscribe(ngos => this.ngos = ngos)
  }

}
