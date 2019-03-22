import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCrudService } from '../../../../data/services/firebase.service';
import {VolunteerapplicationsComponent} from '../volunteerapplications.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singleapplication',
  templateUrl: './singleapplication.component.html',
  styleUrls: ['./singleapplication.component.css']
})
export class SingleapplicationComponent implements OnInit {

  @Input() application

  editTemplate: boolean = false;

  editApplicationForm

  constructor(
    private fbService: FirebaseCrudService,
    private dialog: MatDialogRef<VolunteerapplicationsComponent>,
  ) { }

  ngOnInit() {
    if(this.application) {
      this.editApplicationForm = new FormGroup({
        text: new FormControl(this.application.text, [Validators.required, Validators.minLength(20)]),
      });
    }
    console.log(this.application)
  }

  editApplication(event) {
    event.stopPropagation()
    this.editTemplate = true
  }

  deleteApplication(application) {
    let confirmation = confirm("Are you sure you want to delete this application?");
    if (confirmation) {
      this.fbService.deleteApplication(application.id).then(res => this.dialog.close())
    }
  }

  formSubmit() {
    if(this.editApplicationForm.valid) {
      this.editTemplate = false;
      this.fbService.updateApplication(this.application.id, {text: this.editApplicationForm.value.text})
    }
  }

}
