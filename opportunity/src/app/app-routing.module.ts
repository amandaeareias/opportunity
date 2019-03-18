import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component'
import { NgoProfileComponent } from './ngo-profile/ngo-profile.component'
import {HomepageComponent} from './homepage/homepage.component'
import { AppComponent } from './app.component'
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'volunteer', component: VolunteerProfileComponent},
  {path: 'ngo', component: NgoProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
