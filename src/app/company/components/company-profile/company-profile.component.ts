import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Company } from '../../models/company';
import { Job } from '../../../jobs/models/job';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit{

companyId: any;
editMode: boolean = false;
job:Job[]=[];
  constructor(private data: DataService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
       this.companyId = params.get('id'); 
      if (this.companyId) {
        this.getCompany(this.companyId); 
      }
    });
    // this.getAllCompanies();
  }
  // companiesList: Company[] = [];
  companyObject:Company={
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
  // id:string='';
  // name: string='';
  // email: string='';
  // address:string='';
  // field:string='';
  // password: string='';
  // jobs:Job[]=[]
  // yearFounded:string='';
  // about:string='';
  // logo:string='';

  // getAllCompanies() {
  //   this.data.getAllCompanies().subscribe(res => {
  //     this.companiesList = res.map((e: any) => {
  //       const id = e.payload.doc.id;
  //       const data = e.payload.doc.data();
  //       return { id, ...data } as Company;
  //     });
  //   }, err => {
  //     console.error('Error while fetching data:', err);
  //   });
  // }
  getCompany(id: any) {
    this.data.getCompany(id).then(companyData => { // Assuming getCompany returns a promise
      this.data.getJobsForCompany(id).subscribe(jobs => {
        this.job = jobs;
        
      });
      companyData.id = id;
      this.companyObject = companyData;
    }).catch(error => {
      console.error('Error getting company details:', error);
    });
  }
  toggleEditMode() {
    this.editMode = !this.editMode; // Toggle editMode
  }
  updateCompanyData(){
    this.data.updateCompany(this.companyObject,this.companyId);
    }
    
    deleteJob(jobId: string) {
      const confirmDelete = confirm('Are you sure you want to delete this job?');
      if (!confirmDelete) {
        return; // If the user cancels, do nothing
      }
    
      this.data.deleteJob(jobId)
        .then(() => {
          // Remove the deleted job ID from the jobs array
          this.job = this.job.filter(job => job.id !== jobId);
          // Remove the deleted job ID from the jobs array in the company object
          this.companyObject.jobs = this.companyObject.jobs.filter(job => job !== jobId);
          // Update the jobs array in the company document
          this.data.updateCompanyJobs(this.companyId, this.companyObject.jobs)
            .then(() => {
              alert('Job deleted successfully');
            })
            .catch(error => {
              console.error('Error updating company jobs:', error);
              alert('Error updating company jobs');
            });
        })
        .catch(error => {
          console.error('Error deleting job:', error);
          alert('Error deleting job');
        });
    }
    
    
    
      updateJobsData(job:Job) {
        this.data.updateJob( job,job.id)
        .then(() => {
          alert('Job updated successfully');
        })
        .catch(error => {
          console.error('Error updating job:', error);
          alert('Error updating job');
        });
      }
      selectedLogo: File | null = null;
      // selectedFile: File | null = null;

      onLogoSelected(event: any) {
        this.selectedLogo = event.target.files[0];
      }
      updateCompanyLogo(): void {
        if (this.selectedLogo) {
          this.data.uploadLogo(this.selectedLogo).then(downloadURL => {
            console.log('Logo uploaded successfully. Download URL:', downloadURL);
            this.companyObject.logo = downloadURL; // Update the logo field in the company object
            this.data.updateCompany(this.companyObject, this.companyId); // Update the company data
          }).catch(error => {
            console.error('Error uploading logo:', error);
          });
        } else {
          console.log('No file selected.');
        }
      }
      
  
  
  
}

