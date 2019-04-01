import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-volunteerapplications',
  templateUrl: './volunteerapplications.component.html',
  styleUrls: ['./volunteerapplications.component.css']
})
export class VolunteerapplicationsComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public applications,
    private dialog: MatDialogRef<VolunteerapplicationsComponent>,
  ) { }

  ngOnInit() {
    console.log('applications: ', this.applications)
  }

  closeDialog() {
    this.dialog.close()
  }
}
