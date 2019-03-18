import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-form-validator",
  templateUrl: "./form-validator.component.html",
  styleUrls: ["./form-validator.component.css"]
})
export class FormValidatorComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
  constructor() {}

  ngOnInit() {}
}
