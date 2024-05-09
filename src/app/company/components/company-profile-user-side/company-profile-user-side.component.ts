import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
import { Company } from '../../models/company';
import { Job } from '../../../jobs/models/job';

@Component({
  selector: 'app-company-profile-user-side',
  templateUrl: './company-profile-user-side.component.html',
  styleUrl: './company-profile-user-side.component.css'
})
export class CompanyProfileUserSideComponent implements OnInit{
  companyId: any;
  job:Job[]=[];
  constructor(private data: DataService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
       this.companyId = params.get('id'); 
      if (this.companyId) {
        this.getCompany(this.companyId); 
      }
    });
  }
  companiesList: Company[] = [];
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

  getCompany(id: any) {
    this.data.getCompany(id).then(companyData => { 
      this.data.getJobsForCompany(id).subscribe(jobs => {
        this.job = jobs;
        
      });
      companyData.id = id;
      this.companyObject = companyData;
    }).catch(error => {
      console.error('Error getting company details:', error);
    });
  }

  
  

}
