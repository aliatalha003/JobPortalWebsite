import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Applicant } from '../../../applicant/models/applicant';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private firestore: DataService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  register() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const applicantObj: Applicant = {
      id: '',
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.FirstName,
      lastName: this.signupForm.value.LastName,
      gender: '',
      dob: new Date(),
      phone: '',
      address: '',
      courses: [{ name: '', description: '' }],
      experienceYears: '',
      education: '',
      favJobs: [],
      cv: '',
      about: ''
    };

    this.auth.registerUser(this.signupForm.value.email, this.signupForm.value.password, applicantObj);

    this.signupForm.reset();
  }
}
