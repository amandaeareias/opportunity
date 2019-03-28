import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from '../../data/services/firebase.service'
import { NGO } from 'src/app/data/models/ngo.model';

@Component({
  selector: 'app-all-ngos',
  templateUrl: './all-ngos.component.html',
  styleUrls: ['./all-ngos.component.css']
})
export class AllNgosComponent implements OnInit, OnDestroy {
  private dbSubscription: Subscription;
  public ngos: NGO[];
  /* Pass new styles to NGOList Component */
  public displayNgoListOnAll: any = {
    'margin-top': '40px',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'center',
    'justify-content': 'center',
    'width': '100vw',
  };

  constructor(
    private db: FirebaseCrudService,
  ) {}

  ngOnInit() {
    this.dbSubscription = this.db.getMany('ngos')
      .subscribe((ngos: any) => {
        this.ngos = ngos;
      });
  }

  ngOnDestroy() {
    this.dbSubscription.unsubscribe();
  }

}
