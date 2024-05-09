import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { RouterModule } from '@angular/router';
import { CompanyProfileUserSideComponent } from './components/company-profile-user-side/company-profile-user-side.component';
import { FormsModule } from '@angular/forms';
import { JobDetailCompanySideComponent } from '../jobs/components/job-detail-company-side/job-detail-company-side.component';

@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompanyProfileComponent,
    CompanyProfileUserSideComponent,
    JobDetailCompanySideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    CompanyProfileComponent
  ]
})
export class CompanyModule { }
