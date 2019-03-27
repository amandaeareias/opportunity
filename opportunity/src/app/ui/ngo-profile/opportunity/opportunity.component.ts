import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { MappingService } from 'src/app/data/services/mapping.service';
import { UserState, getUserState } from 'src/app/user/user.reducers';

import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { LoginComponent } from '../../navbar/login/login.component';
import { EditOpportunityComponent } from '../../ngo-profile/opportunity-card-admin/edit-opportunity/edit-opportunity.component';
import { Application } from 'src/app/data/models/application.model';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit, OnDestroy {
  private userStateSubscription: Subscription;
  private dbApplicationsSubscription: Subscription;
  public currentUser: UserState;
  public applying: boolean = false;
  public applied: boolean;
  public isMe: boolean;
  public applyForm = new FormGroup({
    apply: new FormControl('', [Validators.required, Validators.minLength(20)])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public opportunity,
    private db: FirebaseCrudService,
    private store: Store<any>,
    private dialogOpp: MatDialogRef<OpportunityComponent>,
    private dialogEdit: MatDialog,
    private mappingService: MappingService,
    private snackBar: MatSnackBar,
    private LoginComponent: LoginComponent,
  ) { }

  ngOnInit() {
    this.checkUser();
  }

  ngOnDestroy() {
    this.userStateSubscription && this.userStateSubscription.unsubscribe();
    this.dbApplicationsSubscription && this.dbApplicationsSubscription.unsubscribe();
  }

  checkUser() {
    this.store.select(getUserState)
      .subscribe((user: UserState) => {
        this.currentUser = user;
        this.isMe = user.user && user.user.id === this.opportunity.ngo.id;
        if (!user.isNgo) {
          this.dbApplicationsSubscription = this.db.getAllApplicationsOfVolunteer(this.currentUser.user.id)
            .subscribe((res: any[]) => {
              this.applied = res.includes((app: Application) => app.opportunityId === this.opportunity.id);
            });
        }
      });
  }

  applyClicked() {
    if (this.currentUser.isNgo) {
      this.dialogOpp.close();
    } else if (!this.currentUser.isLoggedIn) {
      this.dialogOpp.close();
      this.LoginComponent.loginGoogle(false);
    } else {
      this.applying = true;
    }
  }

  async formSubmit() {
    if (this.applyForm.valid) {
      const data = this.mappingService.mapApplicationInputToProps({
        volunteerId: this.currentUser.user.id,
        opportunityId: this.opportunity.id,
        text: this.applyForm.value.apply
      });
      try {
        await this.db.createApplication(data);
      } catch (err) {
        console.error(err);
      }
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.dialogOpp.close()
    }
  }

  editOpportunity() {
    this.dialogOpp.close()
    this.dialogEdit.open(EditOpportunityComponent, { data: this.opportunity })
  }

}