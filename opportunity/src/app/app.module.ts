import { NgoProfileComponent } from './ngo-profile/ngo-profile.component';
import { NgocardComponent } from './homepage/ngolist/ngocard/ngocard.component';
import { NgolistComponent } from './homepage/ngolist/ngolist.component';
import { OpportunitycardComponent } from './homepage/opportunitieslist/opportunitycard/opportunitycard.component';
import { OpportunitieslistComponent } from './homepage/opportunitieslist/opportunitieslist.component';
import { CoverComponent } from './homepage/cover/cover.component';
import { HomepageComponent } from './homepage/homepage.component';
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
    NgoProfileComponent
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
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
