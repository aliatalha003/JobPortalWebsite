import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { Job } from '../../models/job';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../company/models/company';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {

  constructor(private data: DataService , private auth :AuthService,private route:ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
   this.Display();
  }
  company:Company={
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
  }
   JobList: Job = {
    //  JobData: [],
     title: '',
     id: '',
     description: '',
     location: '',
     qualifications: [],
     applicantApplied: [],
     salary: '',
     experienceNeeded: '',
     educationLevel: '',
     company: '',
     paused: false
   };

  Display(){
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      console.log(jobId);
      this.data.getJob(jobId).then(data => {
        this.JobList = data as Job; 
        // const parts = this.JobList.company.split('/');
        // const id = parts[2];
        // const newVariable = id;

        this.data.getCompany(this.JobList.company).then(data => {
          this.company = data as Company;
          this.JobList.id=jobId;
       })// Assign the fetched job data to JobList
      });
    });
  }

  handleApplyClick() {
    if (this.JobList.paused) {
      alert('This job is currently paused. You cannot apply to it.');
    } else {
      this.router.navigate(['/ApplyToJob', this.JobList.id]);
    }
  }
  
}
