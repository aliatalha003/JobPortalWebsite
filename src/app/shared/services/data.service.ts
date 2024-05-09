import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Applicant } from '../../applicant/models/applicant';
import { Observable, from, of } from 'rxjs';
import { Company } from '../../company/models/company';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Firestore } from '@angular/fire/firestore';
import { Job } from '../../jobs/models/job';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private firestore:AngularFirestore , private storage: AngularFireStorage) { }
  
  CheckCompanyId(company: any): Observable<boolean> {
    if (!company) {
      return of(false); // Return observable with false if company is empty or undefined
    }
    return from(this.firestore.collection('/company').doc(company).get()).pipe(
      map(doc => doc.exists)
    );
  }
  
  CheckApplicant(applicant: any): Observable<boolean> {
    return from(this.firestore.collection('/applicants').doc(applicant).get()).pipe(
      map(doc => doc.exists)
    );
  }
  
  

  addApplicant(applicant: Applicant, documnetId: string) {
    return this.firestore.collection('/applicants').doc(documnetId).set(applicant);
  }
  addCompany(company: Company, documnetId: string) {
    return this.firestore.collection('/company').doc(documnetId).set(company);
  }
  getAllApplicants() {
    return this.firestore.collection('/applicants').snapshotChanges();
  }

  deleteApplicant(applicant: Applicant) {
    return this.firestore.doc('/applicants/' + applicant.id).delete();
  }
  updateApplicantCV(userId: string, cv: string): Promise<void> {
    return this.firestore.collection('applicants').doc(userId).update({ cv });
  }
  updateApplicant(applicant: Applicant, userId: string): Promise<void> {
    // Update the applicant document in Firestore
    return this.firestore.collection('applicants').doc(userId).update(applicant);
  }
  getJobsForCompany(companyRef: any): Observable<any[]> {
    // console.log(companyRef.id);
    return this.firestore.collection('Job', ref => ref.where('company', '==', companyRef)).valueChanges();
  }
  getCompanyForJob(jobRef: any): Observable<any> {
    return this.firestore.collection('company', ref => ref.where('Job', '==', jobRef)).valueChanges();
  }

  getAllCompanies(){
    return this.firestore.collection('/company').snapshotChanges();
  }
  
  getAllJobs(){
    return this.firestore.collection('/Job').snapshotChanges();
  }

getCompany(id:any){
  // console.log(id);
    return new Promise<any>((resolve, reject) => {
          this.firestore.collection('/company').doc(id).get()
            .subscribe(doc => {
              if (doc.exists) {
                console.log(doc.data())
                resolve(doc.data());
              } else {
                reject('No such document!');
              }
            }, error => {
              reject(error);
            });
       
      });
}
    
getJob(id:any){
  return new Promise<any>((resolve, reject) => {
        this.firestore.collection('/Job').doc(id).get()
          .subscribe(doc => {
            if (doc.exists) {
              
              resolve(doc.data());
            } else {
              reject('No such document!');
            }
          }, error => {
            reject(error);
          });
     
    });
}
  
  
// alia
updateCompany(company: Company, Id: string): Promise<void> {
  // Update the applicant document in Firestore
  return this.firestore.collection('company').doc(Id).update(company);
}
UpdateApplicantAppliedinJob(jobId: string | undefined, applicantApplied: string[]) {
  return this.firestore.collection('Job').doc(jobId).update({ applicantApplied })
}
deleteJob(jobId: string) {
  return this.firestore.collection('Job').doc(jobId).delete();
}
updateCompanyJobs(companyId: string, updatedJobs: string[]) {
  return this.firestore.collection('company').doc(companyId).update({ jobs: updatedJobs });
}
// updateJob(jobId: string, updatedJob: Job) {
//   return this.firestore.collection('Job').doc(jobId).update(updatedJob);
// }
uploadCV(file: File): Promise<string> {
  const filePath = `cv/${file.name}`;
  const fileRef = this.storage.ref(filePath);
  return new Promise<string>((resolve, reject) => {
    this.storage.upload(filePath, file).then(() => {
      fileRef.getDownloadURL().subscribe(downloadURL => {
        resolve(downloadURL);
      }, error => {
        reject(error);
      });
    }, error => {
      reject(error);
    });
  });
}

uploadLogo(file: File): Promise<string> {
  const filePath = `logos/${file.name}`;
  const fileRef = this.storage.ref(filePath);

  return new Promise<string>((resolve, reject) => {
    this.storage.upload(filePath, file).then(uploadTask => {
      uploadTask.ref.getDownloadURL().then(downloadURL => {
        resolve(downloadURL);
      }).catch(error => {
        console.error('Error getting logo download URL:', error);
        reject(error);
      });
    }).catch(error => {
      console.error('Error uploading logo:', error);
      reject(error);
    });
  });
}
// habiba
getApplicant(id:any){ 
  return new Promise<any>((resolve, reject) => { 
        this.firestore.collection('/applicants').doc(id).get() 
          .subscribe(doc => { 
            if (doc.exists) { 
               
              resolve(doc.data()); 
            } else { 
              reject('No such document!'); 
            } 
          }, error => { 
            reject(error); 
          }); 
      
    }); 
} 
  
updateJob(job: Job, userId: string): Promise<void> { 
  return this.firestore.collection('Job').doc(userId).update(job); 
} 
 
addJob(job: Job, documnetId: string) { 
  return this.firestore.collection('/Job').doc(documnetId).set(job); 
} 
 
 
  // Function to add the company ID to a job document in the Job collection 
  addCompanyIdToJob(jobId: string, companyId: string): Promise<void> { 
    // Update the job document in the Job collection to include the company ID 
    return this.firestore.collection('Job').doc(jobId) 
      .update({ 
        company: companyId 
      }); 
  } 
 
  // Function to post a job 
  postJob(companyId: string, job: Job,company: Company): Promise<void> { 
    // Add the job to the company's list of jobs 
    return this.updateCompany(company, companyId) 
      .then(() => { 
        // Add the company ID to the job document in the Job collection 
        return this.addCompanyIdToJob(job.id, companyId); 
      }); 
       
  }
}