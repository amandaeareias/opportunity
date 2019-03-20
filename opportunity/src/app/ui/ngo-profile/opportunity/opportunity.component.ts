import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { Store } from '@ngrx/store'
import { userDetailsSelector, isUserNgoSelector } from '../../../user/user.reducers'

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  @Input()dialogConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) public opportunity,
    private fbService: FirebaseCrudService,
    private store: Store<any>,
    private dialog: MatDialogRef<OpportunityComponent>
  ) { }

  ngOnInit() {
  }

  applyClicked() {
    let isNgo: boolean;
    this.store.select(isUserNgoSelector)
      .subscribe(result => {
        isNgo = result
      })
    this.store.select(userDetailsSelector)
      .subscribe(user => {
        this.applyOpp(this.opportunity, user, isNgo)
      })
  }

  applyOpp(opportunity, user, isNgo: boolean) {
    if(isNgo) {
      console.log('only volunteers can apply')
      this.dialog.close()
    } else if (!user.id) {
      console.log('please log-in')
      this.dialog.close()
    } else {
      console.log('applying')
    }

  }

}
