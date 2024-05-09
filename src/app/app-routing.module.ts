import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup-user/signup.component';
import { CompanyProfileComponent } from './company/components/company-profile/company-profile.component';
import { SignupCompanyComponent } from './auth/components/signup-company/signup-company.component';
import { UserProfileComponent } from './applicant/components/user-profile/user-profile.component';
import { JobListComponent } from './jobs/components/job-list/job-list.component';
import { ViewApplicantsComponent } from './applicant/components/view-applicants/view-applicants.component';
import { PostJobComponent } from './jobs/components/post-job/post-job.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CompanyGuard } from './shared/guards/company.guard';
import { applicantGuard } from './shared/guards/applicant.guard';
import { JobDetailsComponent } from './jobs/components/job-details/job-details.component';
import { ApplyToJobComponent } from './applicant/components/apply-to-job/apply-to-job.component';
import { CompanyProfileUserSideComponent } from './company/components/company-profile-user-side/company-profile-user-side.component';
import { JobDetailCompanySideComponent } from './jobs/components/job-detail-company-side/job-detail-company-side.component';
import { FavjopsComponent } from './jobs/components/favjops/favjops.component';
import { UserProfileCompanySideComponent } from './applicant/components/user-profile-company-side/user-profile-company-side.component';
const routes: Routes = [
  {path:'',redirectTo:'Login',pathMatch:'full'},
  {path:'Login',component:LoginComponent},
  {path:'SignUp',component:SignupComponent},
  {path:'CompanyProfile/:id',component:CompanyProfileComponent, canActivate: [CompanyGuard] },
  {path:'CompanyProfileUserSide/:id',component:CompanyProfileUserSideComponent, canActivate: [applicantGuard] },
  {path:'SignUpCompany',component:SignupCompanyComponent},
  {path:'UserProfileCompanySide/:id',component:UserProfileCompanySideComponent,canActivate:[CompanyGuard]},
  {path:'UserProfile/:id',component:UserProfileComponent,canActivate:[applicantGuard]},

  {path:'JobList',component:JobListComponent,canActivate:[applicantGuard]},
  {path:'ViewApplicants/:id',component:ViewApplicantsComponent,canActivate:[CompanyGuard]},
  {path:'PostJop',component:PostJobComponent,canActivate:[CompanyGuard]},
  {path:'JobDetails/:id',component:JobDetailsComponent,canActivate:[applicantGuard]},
  {path:'JobDetailCompanySide/:id',component:JobDetailCompanySideComponent,canActivate:[CompanyGuard]},
  {path:'ApplyToJob/:id',component:ApplyToJobComponent,canActivate:[applicantGuard]},
  {path:'FavJobs',component:FavjopsComponent,canActivate:[applicantGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
