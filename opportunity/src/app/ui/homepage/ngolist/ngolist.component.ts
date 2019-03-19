import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'

@Component({
  selector: 'app-ngolist',
  templateUrl: './ngolist.component.html',
  styleUrls: ['./ngolist.component.css']
})
export class NgolistComponent implements OnInit {

  ngos;

  constructor(
    private service: FirebaseCrudService,
  ) { }

  ngOnInit() {

    this.service.getMany('ngos').subscribe(ngos => {
      this.ngos = ngos
      console.log('NGOs: ', this.ngos)
    })

  }

}
