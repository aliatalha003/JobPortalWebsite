import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { Job } from '../../models/job';
import { Router } from '@angular/router';
import { Applicant } from '../../../applicant/models/applicant';
import { Company } from '../../../company/models/company';

@Component({
  selector: 'app-favjops',
  templateUrl: './favjops.component.html',
  styleUrl: './favjops.component.css'
})
export class FavjopsComponent {
  constructor(private data: DataService , private auth :AuthService,private router:Router) { }
  ngOnInit(): void {
   this.DisplayFavJobs();
  }

  JobList : Job []=[]
  companySet: Set<string> = new Set(); // Use Set to ensure uniqueness of company IDs
  companies: Company[] = [];
  
  DisplayFavJobs() {
    const dataPromise = this.auth.getCurrentApplicantData();
    dataPromise.then(data => {
      data.favJobs.forEach((favJob: any) => {
        this.data.getJob(favJob).then(jobData => {
          if (jobData) {
            jobData.id = favJob; // Set job ID
            this.JobList.push(jobData);

            // Add company ID to the set
            this.companySet.add(jobData.company);
          } else {
            console.log('No job data found for job ID:', favJob);
          }
        }).catch(error => {
          console.error('Error fetching job data:', error);
        });
      });

      // Fetch company data after all jobs are fetched
      Promise.all(data.favJobs.map((favJob: any) => this.data.getJob(favJob)))
        .then(jobDataList => {
          const companyPromises: Promise<void>[] = [];
          const companySet = new Set<string>(); // Temporary Set to ensure uniqueness of companies

          jobDataList.forEach(jobData => {
            if (jobData) {
              companySet.add(jobData.company);
            }
          });

          companySet.forEach(companyId => {
            const companyPromise = this.data.getCompany(companyId)
              .then(companyData => {
                if (companyData) {
                  this.companies.push(companyData); // Push unique companies to array
                }
              })
              .catch(error => {
                console.error('Error fetching company data:', error);
              });
            companyPromises.push(companyPromise);
          });

          Promise.all(companyPromises)
            .then(() => {
              console.log('Unique companies:', this.companies);
            })
            .catch(error => {
              console.error('Error fetching company data:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching job data:', error);
        });
    }).catch(error => {
      console.error('Error fetching applicant data:', error);
    });
  }

  // Convert Set to array for use in the template
  removeJobFromFav(jobId: string) {
    const dataPromise = this.auth.getCurrentApplicantData();
    dataPromise.then(data => {
      // Find the index of the jobId in the favJobs array
      const index = data.favJobs.indexOf(jobId);
      if (index !== -1) {
        // Remove the jobId from the favJobs array
        data.favJobs.splice(index, 1);
        this.JobList.splice(index, 1);
              // Update the applicant document in the database
        this.data.updateApplicant(data, data.id)
          .then(() => {
            console.log('Job removed from favJobs:', jobId);
            // Update the display text or any other necessary logic here
          })
          .catch(error => {
            console.error('Error updating applicant data:', error);
          });
      } else {
        console.warn('Job not found in favJobs:', jobId);
      }
    }).catch(error => {
      console.error('Error fetching applicant data:', error);
    });
  }


}

