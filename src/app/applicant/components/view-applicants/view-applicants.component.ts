import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { Job } from '../../../jobs/models/job';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../company/models/company';
import { Applicant } from '../../models/applicant';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {
  constructor(
    private data: DataService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Display();
  }

  company: Company = {
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

  JobList: Job[] = [];
  check: string[] = [];
  apllicant: Applicant[] = [];

  Display() {
    this.route.params.subscribe(params => {
      const CompanyID = params['id'];

      this.data.getCompany(CompanyID).then(ComData => {
        ComData.jobs.forEach((job: any) => {
          this.data.getJob(job).then(JobData => {
            JobData.applicantApplied.forEach((applicantID: any) => {
              if (applicantID) {
                this.data.getApplicant(applicantID).then(ApplicantData => {
                  // Push only once for each job
                  if (!this.JobList.some(j => j.id === JobData.id)) {
                    this.JobList.push(JobData);
                  }
                  if (!this.check.includes(applicantID)) {
                    this.check.push(applicantID);
                    this.apllicant.push(ApplicantData);
                  }
                });
              }
            });
          });
        });
      });
    });
    console.log(this.apllicant)
    console.log(this.JobList)
  }

  RemoveApplied(applicantId: string, jobId: string) {
    // Find the job object in JobList by its ID
    const jobIndex = this.JobList.findIndex(job => job.id === jobId);

    // If job exists, remove the applicant ID from applicantApplied array
    if (jobIndex !== -1) {
      const job = this.JobList[jobIndex];
      job.applicantApplied = job.applicantApplied.filter(id => id !== applicantId);

      // Update the job in the database
      this.data
        .updateJob(job, job.id)
        .then(() => {
          console.log('Applicant removed successfully from job:', job.title);

          // Remove the applicant from the applicant array
          this.apllicant = this.apllicant.filter(app => app.id !== applicantId);
        })
        .catch(error => {
          console.error('Error removing applicant from job:', error);
        });

      // Remove the job from JobList if there are no more applicants
      if (job.applicantApplied.length === 0) {
        this.JobList.splice(jobIndex, 1);
      }
    } else {
      console.error('Job not found in JobList:', jobId);
    }
  }

  filteredApplicant: Applicant[] = [];
  isFiltered: boolean = false;

  FilterByKeyword(event: any) {
    this.filteredApplicant = this.apllicant;
    const keyword = event.target.value.toLowerCase();
    this.filteredApplicant = this.apllicant.filter(
      applicant =>
        applicant.firstName.toLowerCase().includes(keyword) ||
        applicant.lastName.toLowerCase().includes(keyword)
    );
    this.isFiltered = true;
  }
}
