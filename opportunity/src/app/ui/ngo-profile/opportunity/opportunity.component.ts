import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { MappingService } from '../../../data/services/mapping.service'
import { Store } from '@ngrx/store'
import { userDetailsSelector, isUserNgoSelector } from '../../../user/user.reducers'
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  @Input()dialogConfig;
  currentUser;
  applying: boolean = false

  applyForm = new FormGroup({
    apply: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public opportunity,
    private fbService: FirebaseCrudService,
    private store: Store<any>,
    private dialog: MatDialogRef<OpportunityComponent>,
    private mappingService: MappingService,
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
        this.currentUser = user
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
      this.applying = true
    }
  }

  formSubmit() {
    if(this.applyForm.valid){
      console.log('waiting for the function to be ready, uncomment next 2 lines when it is')
      const data = this.mappingService.mapApplicationInputToProps(this.currentUser.id, this.opportunity.id, this.applyForm.value.apply)
      this.fbService.createApplication(data)
      this.dialog.close()
    }else {
      console.log('not valid')
    }
  }

}