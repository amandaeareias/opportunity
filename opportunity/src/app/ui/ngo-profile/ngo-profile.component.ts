import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreateOpportunityComponent} from './create-opportunity/create-opportunity.component';
import { ActivatedRoute } from '@angular/router';
import {FirebaseCrudService} from '../../data/services/firebase.service'

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent implements OnInit {

  ngo;
  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private service: FirebaseCrudService) { }

  ngOnInit() {
    this.getNGO()
  }

  getNGO() {
    const param = this.route.snapshot.paramMap.get('id')
    this.service.getOne('ngos', param)
      .subscribe(ngo => {
        this.ngo = ngo
        console.log(this.ngo)
      })
  }

  openCreateOpportunity() {
    this.dialog.open(CreateOpportunityComponent);
  }


}
