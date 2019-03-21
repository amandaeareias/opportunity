import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-ngoapplications',
  templateUrl: './ngoapplications.component.html',
  styleUrls: ['./ngoapplications.component.css']
})
export class NGOapplicationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public applications,
  ) { }

  ngOnInit() {
    console.log('applications', this.applications)
  }

}
