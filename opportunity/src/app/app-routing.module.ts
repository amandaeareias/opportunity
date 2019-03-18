import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component'
import { AppComponent } from './app.component'
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';

const routes: Routes = [
  // replace app component with home component, this is just for dev purpose
  // {
  //   path: 'home',
  //   component: AppComponent
  // },
  {path: 'volunteer', component: VolunteerProfileComponent},
  {path: 'singup-ngo', component: NgoSignupComponent}
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
