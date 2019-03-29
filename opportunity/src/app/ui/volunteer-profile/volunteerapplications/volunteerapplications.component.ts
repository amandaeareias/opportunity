import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-volunteerapplications',
  templateUrl: './volunteerapplications.component.html',
  styleUrls: ['./volunteerapplications.component.css']
})
export class VolunteerapplicationsComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public applications,
    private dialog: MatDialogRef<VolunteerapplicationsComponent>,
  ) { }

  closeDialog() {
    this.dialog.close()
  }
}
