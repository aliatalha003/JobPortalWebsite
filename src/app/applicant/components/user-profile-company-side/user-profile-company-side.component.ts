import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from '../../models/applicant';

@Component({
  selector: 'app-user-profile-company-side',
  templateUrl: './user-profile-company-side.component.html',
  styleUrl: './user-profile-company-side.component.css'
})
export class UserProfileCompanySideComponent {
 
    applicantObj:Applicant={
      id: '',
      firstName: '',
      password: '',
      lastName: '',
      gender: '',
      dob: new Date(),
      phone: '',
      address: '',
      courses: [],
      experienceYears: '',
      education: '',
      email: '',
      favJobs: [],
      cv: '',
      about: ''
    }
    
    constructor(private data: DataService,private route: ActivatedRoute) { }
    applicantId:any;
  
    ngOnInit(): void {
      // this.getAllApplicants();
      this.route.paramMap.subscribe(params => {
        this.applicantId = params.get('id'); 
       if (this.applicantId) {
         this.getApplicant(); 
       }
     });
    }
  
    getApplicant(){
      this.data.getApplicant(this.applicantId).then((applicant)=>{
        console.log(applicant);
        this.applicantObj=applicant;
        console.log("successfully retrieved the applicant");
      }).catch(error =>{
        console.log("an error has occured",error);
      })
    }
    viewCV(): void {
      if (typeof this.applicantObj.cv !== 'undefined') {
          window.open(this.applicantObj.cv, '_blank');
      } else {
          alert('This applicant did not upload a CV yet.');
      }
  }
  

  }
  
