import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ngocard',
  templateUrl: './ngocard.component.html',
  styleUrls: ['./ngocard.component.css']
})
export class NgocardComponent implements OnInit {

  @Input() ngo;
  constructor() { }

  ngOnInit() {
  }

}
