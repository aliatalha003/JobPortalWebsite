import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicantModule } from './applicant/applicant.module';
import { JobsModule } from './jobs/jobs.module';
import { CompanyModule } from './company/company.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyBWPcE3sW8Yo-_8hTHOoePkualoHM1um60",
  authDomain: "job-portal2-701c1.firebaseapp.com",
  projectId: "job-portal2-701c1",
  storageBucket: "job-portal2-701c1.appspot.com",
  messagingSenderId: "560459086434",
  appId: "1:560459086434:web:8d72e66f06b5da90bdaf3b"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ApplicantModule,
    JobsModule,
    CompanyModule,
    AuthModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"jobportal-eba6c","appId":"1:434845183785:web:972559e52fbab3ba4a5138","storageBucket":"jobportal-eba6c.appspot.com","apiKey":"AIzaSyAi1UqSpFNG2jaXFwYKKKMYtOxbWPoo1e8","authDomain":"jobportal-eba6c.firebaseapp.com","messagingSenderId":"434845183785"})),
    provideFirebaseApp(() => initializeApp({"projectId":"job-portal2-701c1","appId":"1:560459086434:web:8d72e66f06b5da90bdaf3b","storageBucket":"job-portal2-701c1.appspot.com","apiKey":"AIzaSyBWPcE3sW8Yo-_8hTHOoePkualoHM1um60","authDomain":"job-portal2-701c1.firebaseapp.com","messagingSenderId":"560459086434"}))
  ],
  providers: [
    provideClientHydration(),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
