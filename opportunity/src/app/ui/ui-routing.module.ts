import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';

const routes: Routes = [
  {
    path: 'volunteer',
    component: VolunteerProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
