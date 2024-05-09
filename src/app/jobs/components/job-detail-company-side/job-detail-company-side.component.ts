import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../company/models/company';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-detail-company-side',
  templateUrl: './job-detail-company-side.component.html',
  styleUrl: './job-detail-company-side.component.css'
})
export class JobDetailCompanySideComponent {
  constructor(private data: DataService , private auth :AuthService,private route:ActivatedRoute) { }
  ngOnInit(): void {
   this.Display();
  }
  editMode: boolean = false;

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
   JobObj: Job = {
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
        this.JobObj = data as Job; 
        // const parts = this.JobObj.company.split('/');
        // const id = parts[2];
        // const newVariable = id;

        this.data.getCompany(this.JobObj.company).then(data => {
          this.company = data as Company;
          this.JobObj.id=jobId;
       })// Assign the fetched job data to JobObj
      });
    });
  }
  toggleEditMode() {
    this.editMode = !this.editMode; 
  }
  updateJobsData(job:Job) {
    this.data.updateJob( job,job.id);
    
  }
  togglePauseJob(job: Job) {
    job.paused = !job.paused;
    this.updateJobsData(job); 
  }
}
