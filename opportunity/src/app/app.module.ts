import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { userReducer } from './store/user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomepageComponent } from './homepage/homepage.component';
import { CoverComponent } from './homepage/cover/cover.component';
import { OpportunitieslistComponent } from './homepage/opportunitieslist/opportunitieslist.component';
import { OpportunitycardComponent } from './homepage/opportunitieslist/opportunitycard/opportunitycard.component';
import { NgolistComponent } from './homepage/ngolist/ngolist.component';
import { NgocardComponent } from './homepage/ngolist/ngocard/ngocard.component';
import { NgoProfileComponent } from './ngo-profile/ngo-profile.component';
import { OpportunityCardAdminComponent } from './ngo-profile/opportunity-card-admin/opportunity-card-admin.component';
import { CreateOpportunityComponent } from './ngo-profile/create-opportunity/create-opportunity.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OpportunityComponent } from './ngo-profile/opportunity/opportunity.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    VolunteerProfileComponent,
    HomepageComponent,
    CoverComponent,
    OpportunitieslistComponent,
    OpportunitycardComponent,
    NgolistComponent,
    NgocardComponent,
    NgoProfileComponent,
    OpportunityCardAdminComponent,
    CreateOpportunityComponent,
    OpportunityComponent
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
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
