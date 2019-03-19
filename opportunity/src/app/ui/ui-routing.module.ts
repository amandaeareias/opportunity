import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { NgoProfileComponent } from './ngo-profile/ngo-profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from './volunteer-signup/volunteer-signup.component';
import { AllOpportunitiesComponent } from './all-opportunities/all-opportunities.component';
import { AllNgosComponent } from './all-ngos/all-ngos.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'volunteer', component: VolunteerProfileComponent },
  { path: 'ngo', component: NgoProfileComponent },
  { path: 'singup-ngo', component: NgoSignupComponent },
  { path: 'singup-volunteer', component: VolunteerSignupComponent },
  { path: 'all-opportunities', component: AllOpportunitiesComponent },
  { path: 'all-ngos', component: AllNgosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
