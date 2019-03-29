import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ngocard',
  templateUrl: './ngocard.component.html',
  styleUrls: ['./ngocard.component.css']
})
export class NgocardComponent implements OnInit {

  private ngoFallbackImage = '/assets/ngo-fallback.jpg';
  @Input() ngo;

  constructor() { }

  ngOnInit() {
    if (!this.ngo.image) this.ngo.image = this.ngoFallbackImage;
  }

}
