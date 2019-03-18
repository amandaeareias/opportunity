import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'signup-ngo', component: NgoSignupComponent },
  { path: 'signup-volunteer', component: VolunteerSignupComponent },
   {path: 'volunteer', component: VolunteerProfileComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
