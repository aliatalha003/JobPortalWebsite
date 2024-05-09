import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { ViewApplicantsComponent } from '../applicant/components/view-applicants/view-applicants.component';
import { RouterModule } from '@angular/router';
import { FavjopsComponent } from './components/favjops/favjops.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    JobListComponent,
    PostJobComponent,
    ViewApplicantsComponent,
    FavjopsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],

  exports:[
    JobListComponent,
    ViewApplicantsComponent,
    PostJobComponent
    
  ]
})
export class JobsModule { }
