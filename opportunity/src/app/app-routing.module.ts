import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component'
import {HomepageComponent} from './homepage/homepage.component'
import { AppComponent } from './app.component'

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'volunteer', component: VolunteerProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
