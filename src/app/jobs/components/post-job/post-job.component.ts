import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { Job } from '../../models/job';
import { Router } from '@angular/router';
import { Company } from '../../../company/models/company';
import { Applicant } from '../../../applicant/models/applicant';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent implements OnInit  {
  constructor(private data: DataService , private auth :AuthService,private router:Router,private firestore:AngularFirestore) { }
   EducationalLevel!: string;
   qualifications!: string;
   Location!: string;
   Description!: string;
   Name!: string;

   
   
  ngOnInit(): void {
    this.PostNewJop();
   }
   
  PostNewJop(){
    //Get Current Company Data
    const dataPromise = this.auth.getCurrentCompanyData();
    dataPromise.then(data => {
     console.log(data);
     const DOcId=this.firestore.createId();
     const jopobj: Job = { // Define job object here
      // JobData: [],
      title: this.Name,
      id: DOcId,
      description: this.Description,
      location: this.Location,
      qualifications: [this.qualifications],
      applicantApplied: [],
      salary: '',
      experienceNeeded: '',
      educationLevel: this.EducationalLevel,
      company: '',
      paused: false
    };
     
     data.jobs.push(jopobj.id);
     jopobj.id=DOcId;
     //Add Job Document
     this.data.addJob(jopobj,DOcId);
  
    
     // Add Job To Current Company Jobs Array
     //Add Company id To Job : Company 
     this.data.postJob(data.id,jopobj,data);
     alert('Job Added ');
    this.router.navigate(['/CompanyProfile',data.id]);
    })

    

  }

}
