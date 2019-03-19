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
import { MatButtonModule, MatToolbarModule, MatMenuModule } from '@angular/material';

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

/* User defined state management */
import { userReducer } from './user/user.reducers';
import { uiReducer } from './ui/ui.reducers';
import { UserEffects } from './user/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    VolunteerProfileComponent,
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
    StoreModule.forRoot({
      user: userReducer,
      ui: uiReducer,
    }),
    EffectsModule.forRoot([ UserEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
