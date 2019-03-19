/* Angular core imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Firebase imports */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

/* Material design imports */
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
} from '@angular/material';

/* Angular Forms imports */
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* ngrx imports */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/* User defined UI modules and components */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './ui/ui-routing.module';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './ui/navbar/login/login.component';
import { VolunteerProfileComponent } from './ui/volunteer-profile/volunteer-profile.component';
import { HomepageComponent } from './ui/homepage/homepage.component';
import { CoverComponent } from './ui/homepage/cover/cover.component';
import { OpportunitieslistComponent } from './ui/homepage/opportunitieslist/opportunitieslist.component';
import { OpportunitycardComponent } from './ui/homepage/opportunitieslist/opportunitycard/opportunitycard.component';
import { NgolistComponent } from './ui/homepage/ngolist/ngolist.component';
import { NgocardComponent } from './ui/homepage/ngolist/ngocard/ngocard.component';
import { NgoProfileComponent } from './ui/ngo-profile/ngo-profile.component';
import { VolunteerSignupComponent } from './ui/volunteer-signup/volunteer-signup.component';
import { NgoSignupComponent } from './ui/ngo-signup/ngo-signup.component';
import { OpportunityCardAdminComponent } from './ui/ngo-profile/opportunity-card-admin/opportunity-card-admin.component';
import { CreateOpportunityComponent } from './ui/ngo-profile/create-opportunity/create-opportunity.component';
import { OpportunityComponent } from './ui/ngo-profile/opportunity/opportunity.component';

/* User defined state management */
import { userReducer } from './user/user.reducers';
import { uiReducer } from './ui/ui.reducers';
import { UserEffects } from './user/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VolunteerProfileComponent,
    HomepageComponent,
    CoverComponent,
    OpportunitieslistComponent,
    OpportunitycardComponent,
    NgolistComponent,
    NgocardComponent,
    NgoProfileComponent,
    VolunteerSignupComponent,
    NgoSignupComponent,
    OpportunityCardAdminComponent,
    CreateOpportunityComponent,
    OpportunityComponent,
  ],
  entryComponents: [
    CreateOpportunityComponent,
    OpportunityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      user: userReducer,
      ui: uiReducer,
    }),
    EffectsModule.forRoot([ UserEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
