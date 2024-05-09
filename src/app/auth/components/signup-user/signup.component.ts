import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Applicant } from '../../../applicant/models/applicant';
import { Course } from '../../../applicant/models/course';
import { Job } from '../../../jobs/models/job';
import { DataService } from '../../../shared/services/data.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  email:string='';
  password:string='';
  FirstName:string='';
  LastName:string='';

  // applicantList: Applicant[] = [];
  applicantObj:Applicant={
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: new Date(),
    phone: '',
    password: '',
    address: '',
    courses: [{ name: '', description: '' }],
    experienceYears: '',
    education: '',
    email: '',
    favJobs: [] as Job[],
    cv: '',
    about: ''
  }

  constructor(private auth:AuthService,private firestore:DataService){}
  ngOnInit(): void {
  }

  register(){
    if(this.email=='' ||this.password==''  ){
      alert('Please enter all the values')
      return ;
    }
    this.applicantObj.email=this.email;
    this.applicantObj.password=this.password;
    this.applicantObj.firstName=this.FirstName;
    this.applicantObj.lastName=this.LastName;

  // const emptyRef = this.firestore.getEmptyReference();
    // this.applicantObj.favJobs=emptyRef;
    this.auth.registerUser(this.email,this.password,this.applicantObj);
    
    this.email='';
    this.password='';
    this.FirstName='';
    this.LastName='';
  }
}
