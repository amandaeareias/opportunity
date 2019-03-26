import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { MappingService } from '../../../data/services/mapping.service'
import { Store } from '@ngrx/store'
import { userDetailsSelector, isUserNgoSelector } from '../../../user/user.reducers'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../snackbar/snackbar.component'
import { LoginComponent } from '../../navbar/login/login.component'
import { EditOpportunityComponent } from '../../ngo-profile/opportunity-card-admin/edit-opportunity/edit-opportunity.component'

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  currentUser;
  applying: boolean = false

  applyForm = new FormGroup({
    apply: new FormControl('', [Validators.required, Validators.minLength(20)])
  });

  applied: boolean = false
  isNgo: boolean;
  isNgoOwner: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public opportunity,
    private fbService: FirebaseCrudService,
    private store: Store<any>,
    private dialogOpp: MatDialogRef<OpportunityComponent>,
    private dialogEdit: MatDialog,
    // private dialog: MatDialogRef<>,
    private mappingService: MappingService,
    private snackBar: MatSnackBar,
    private LoginComponent: LoginComponent,
  ) { }

  ngOnInit() {
    this.checkUser()
  }

  checkUser() {
    this.store.select(isUserNgoSelector)
      .subscribe(result => {
        this.isNgo = result
      })
    this.store.select(userDetailsSelector)
      .subscribe(user => {
        this.currentUser = user
        if (this.currentUser && this.currentUser.id === this.opportunity.ngo.id) {
          this.isNgoOwner = true
        }
      })
    this.fbService.getAllApplicationsOfVolunteer(this.currentUser.id).subscribe(res => {
      if (res.length > 0) {
        for (let appx of res) {
          const app: any = appx
          if (app.opportunityId === this.opportunity.id) {
            this.applied = true
          }
        }
      }
    })
  }

  applyClicked() {
    if (this.isNgo) {
      this.dialogOpp.close()
    } else if (!this.currentUser) {
      this.dialogOpp.close()
      this.LoginComponent.loginGoogle(false) // call the function again IF LOG-IN SUCCESS so the user can apply without clicking again
    } else {
      this.applying = true
    }
  }

  formSubmit() {
    if (this.applyForm.valid) {
      const data = this.mappingService.mapApplicationInputToProps({ volunteerId: this.currentUser.id, opportunityId: this.opportunity.id, text: this.applyForm.value.apply })
      this.fbService.createApplication(data)
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.dialogOpp.close()
    } else {
    }
  }

  editOpportunity() {
    this.dialogOpp.close()
    this.dialogEdit.open(EditOpportunityComponent, { data: this.opportunity })
  }

}