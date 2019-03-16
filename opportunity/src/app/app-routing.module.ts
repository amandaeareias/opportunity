import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { VolunteerSignupComponent } from './volunteer-signup/volunteer-signup.component';

const routes: Routes = [
  { path: 'signup-ngo', component: NgoSignupComponent },
  { path: 'signup-volunteer', component: VolunteerSignupComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
