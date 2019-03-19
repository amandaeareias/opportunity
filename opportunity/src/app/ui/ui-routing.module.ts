import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { NgoProfileComponent } from './ngo-profile/ngo-profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from './volunteer-signup/volunteer-signup.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'volunteer', component: VolunteerProfileComponent },
  { path: 'ngo', component: NgoProfileComponent },
  { path: 'singup-ngo', component: NgoSignupComponent },
  { path: 'singup-volunteer', component: VolunteerSignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }