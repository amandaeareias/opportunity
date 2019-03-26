import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../data/services/firebase.service'
import { MatDialog } from '@angular/material/dialog';
import { NGOapplicationsComponent } from '../ngoapplications/ngoapplications.component'

@Component({
  selector: 'app-opportunity-card-admin',
  templateUrl: './opportunity-card-admin.component.html',
  styleUrls: ['./opportunity-card-admin.component.css']
})
export class OpportunityCardAdminComponent implements OnInit {

  @Input() opportunity;
  applications;
  constructor(
    private fbService: FirebaseCrudService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getApplications()
    console.log(this.opportunity)
  }

  getApplications() {
    this.fbService.getAllApplicationsOfOpportunity(this.opportunity.id)
      .subscribe(result => this.applications = result)
  }

  seeApplicants(event) {
    event.stopPropagation()
    this.dialog.open(NGOapplicationsComponent, {data: this.applications});
  }

  editOpportunity(){

  }

}