import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-ngoapplications',
  templateUrl: './ngoapplications.component.html',
  styleUrls: ['./ngoapplications.component.css']
})
export class NGOapplicationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public applications,
    private dialog: MatDialogRef<NGOapplicationsComponent>,
  ) { }

  ngOnInit() {
  }

  goToApplicant() {
    this.dialog.close()
  }

}
