import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup-user/signup.component';
import { SharedModule } from '../shared/shared.module';
import { SignupCompanyComponent } from './components/signup-company/signup-company.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupCompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
