import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../../shared/services/auth.service'; 
import { DataService } from '../../../shared/services/data.service'; 
import { Job } from '../../models/job'; 
import { Router } from '@angular/router'; 
import { Company } from '../../../company/models/company'; 
import { Applicant } from '../../../applicant/models/applicant'; 
 
@Component({ 
  selector: 'app-job-list', 
  templateUrl: './job-list.component.html', 
  styleUrl: './job-list.component.css' 
}) 
export class JobListComponent { 
  company: Set<Company> = new Set() 
  constructor(private data: DataService , private auth :AuthService,private router:Router) { } 
  ngOnInit(): void { 
     
    this.getAllJobs(); 
     
 
  } 
displayText: string = 'Save'; 
JobList : Job []=[] 
companySet: Set<string> = new Set(); 
companies: Company[] = []; 
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
allLocations :string[]=[];
allTypes :string[]=[];
getAllJobs() { 
  this.data.getAllJobs().subscribe(res => { 
    res.forEach((e: any) => { 
      const jobData = e.payload.doc.data() as Job; 
      jobData.id = e.payload.doc.id; 
      if (!this.JobList.some(job => job.id === jobData.id)) { 
        this.JobList.push(jobData); 
        if(!this.allLocations.includes(jobData.location)){
          this.allLocations.push(jobData.location);}

          if(!this.allTypes.includes(jobData.title)){
            this.allTypes.push(jobData.title);}
        
        // Fetch company data for the current job 
        this.data.getCompany(jobData.company).then(companyData => { 
          if (companyData) { 
            const company = companyData as Company; 
            // Add company to the set if it doesn't already exist 
            if (!this.companySet.has(company.id)) { 
              this.companySet.add(company.id); 
              this.companies.push(company); 
            } 
          } else { 
            console.log('No company data found for job ID:', jobData.id); 
          } 
        }).catch(error => { 
          console.error('Error fetching company data:', error); 
        }); 

 
      } 
    }); 
  }, err => { 
    console.error('Error while fetching data:', err); 
  }); 
} 
 
AddJobToFav(id:any){ 
 
  const dataPromise = this.auth.getCurrentApplicantData(); 
  dataPromise.then(data => { 
     this.applicantObj=data; 
     if( !this.applicantObj.favJobs.includes(id)){ 
        this.applicantObj.favJobs.push(id); 
          this.data.updateApplicant(this.applicantObj, data.id).then(()=>{ 
           alert('Job saved'); 
          }); 
     } 
  }).catch(error => { 
    console.error('Error fetching applicant data:', error); 
  }); 
    
 
} 


filteredJobList : Job []=[];
isfilterd :boolean =false;

  FilterByLocation(event: any) {
    this.filteredJobList = this.JobList;
    const selectedLocation = event.target.value;
    if(!(selectedLocation=="")){
    this.filteredJobList = this.JobList.filter(job => job.location.toLowerCase() === selectedLocation.toLowerCase());
    this.isfilterd= true;
    }
  }
    
  FilterBySalary(event: any) {
    
    const selectedValue = event.target.value;
    let minSalary: number;
    let maxSalary: number;
  
    switch (selectedValue) {
      case '0-10':
        minSalary = 0;
        maxSalary = 9000;
        break;
      case '10-15':
        minSalary = 10000;
        maxSalary = 15000;
        break;
      case '15+':
        minSalary = 16000;
        maxSalary = Infinity; 
        break;
      default:
        minSalary = 0;
        maxSalary = Infinity; 
    }
  
  
    this.FilterBySalaryRange(minSalary, maxSalary);
  }
  
  FilterBySalaryRange(minSalary: number, maxSalary: number) {
    
    this.filteredJobList = this.JobList;
    this.filteredJobList = this.JobList.filter(job => {
      const salary = parseInt(job.salary);
      return salary >= minSalary && salary <= maxSalary;
    });
    this.isfilterd= true;
  }
FilterByType(event: any){
  this.filteredJobList = this.JobList;
  const selectedType = event.target.value;
  if(!(selectedType=="")){
  this.filteredJobList = this.JobList.filter(job => job.title.toLowerCase() === selectedType.toLowerCase());
  this.isfilterd= true;
  }
}
FilterByKeyword(event: any) {
  this.filteredJobList = this.JobList;
  const keyword = event.target.value;
  this.filteredJobList = this.JobList.filter(job => 
    job.title.toLowerCase().includes(keyword.toLowerCase()) || 
    job.location.toLowerCase().includes(keyword.toLowerCase()) || 
    this.companies.find(company => company.id === job.company)?.name.toLowerCase().includes(keyword.toLowerCase())
  );
  this.isfilterd= true;
}



}