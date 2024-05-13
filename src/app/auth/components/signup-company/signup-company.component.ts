import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Company } from '../../../company/models/company';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      field: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  registerCompany() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const companyObj: Company = {
      id: '',
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      name: this.signupForm.value.name,
      address: this.signupForm.value.address,
      field: this.signupForm.value.field,
      jobs: [],
      yearFounded: '',
      about: '',
      logo: ''
    };

    this.auth.registerCompany(companyObj);

    this.signupForm.reset();
  }
}
