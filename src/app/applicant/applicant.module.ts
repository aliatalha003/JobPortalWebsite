import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ApplyToJobComponent } from './components/apply-to-job/apply-to-job.component';
import { JobDetailsComponent } from '../jobs/components/job-details/job-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserProfileCompanySideComponent } from './components/user-profile-company-side/user-profile-company-side.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    ApplyToJobComponent,
    JobDetailsComponent,
    UserProfileCompanySideComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    ApplyToJobComponent,
    JobDetailsComponent,
    UserProfileComponent,
  ]
})
export class ApplicantModule { }
