import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Company } from '../../../company/models/company';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrl: './signup-company.component.css'
})
export class SignupCompanyComponent implements OnInit{
  email:string='';
  password:string='';
  name:string='';
  field:string='';
  address:string='';
  companyObj: Company = {
    id: '',
    name: '',
    email: '',
    address: '',
    field: '',
    password: '',
    jobs: [],
    yearFounded: '',
    about: '',
    logo: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {}

  registerCompany() {
    if (this.email === '' || this.password === '' || this.name === '' || this.address === '' || this.field === '') {
      alert('Please enter all the values');
      return;
    }

    this.companyObj.email = this.email;
    this.companyObj.password = this.password;
    this.companyObj.name = this.name;
    this.companyObj.address = this.address;
    this.companyObj.field = this.field;
    
    this.auth.registerCompany(this.email, this.password, this.companyObj);

    this.email = '';
    this.password = '';
    this.name = '';
    this.address = '';
    this.field = '';
  }
}