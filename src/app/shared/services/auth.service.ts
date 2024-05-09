import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Applicant } from '../../applicant/models/applicant';
import { Company } from '../../company/models/company';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth,private router:Router,private firestore:AngularFirestore,private dataService: DataService) { }


  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( ()=>{
      localStorage.setItem('token','true');
      this.fireauth.authState.subscribe(async user => {
        if (user) { 
        await this.dataService.CheckCompanyId(user.uid).subscribe(result => {
          // console.log("company exists:", result);
          if(result==true){
            this.router.navigate([`/CompanyProfile/${user.uid}`]);
          }else {
           this.router.navigate(['/JobList']);
          }
        });
     
          
        } else {
          return ;
        }
      });
    },err=>{
      alert(err.message);
      this.router.navigate(['/Login']);
    })
  }
 

  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('Successful registeration')
      this.router.navigate(['/Login']);
    },err=>{
      alert(err.message);
      this.router.navigate(['/SignUp']);
    })
  }
  registerUser(email: string, password: string, applicant: Applicant) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const userId = userCredential.user.uid; // Get the user ID from the userCredential
          applicant.id=userId;
          this.dataService.addApplicant(applicant, userId)
            .then(() => {

              alert('Successful registration');
              this.router.navigate(['/Login']);
            })
            .catch(err => {
              alert('Error adding applicant: ' + err.message);
              this.router.navigate(['/SignUp']);
            });
        } else {
          alert('User data not available');
          this.router.navigate(['/SignUp']);
        }
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/SignUp']);
      });
  }

  getCurrentApplicantData() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.authState.subscribe(user => {
        if (user) { 
         
          this.firestore.collection('/applicants').doc(user.uid).get()
            .subscribe(doc => {
              if (doc.exists) {
                
                resolve(doc.data());
              } else {
                reject('No such document!');
              }
            }, error => {
              reject(error);
            });
        } else {
          reject('No current user!');
        }
      });
    });
    
  }

    getCurrentUserId(): Promise<string | null> {
      return new Promise((resolve, reject) => {
        this.fireauth.authState.subscribe(user => {
          if (user) {
            resolve(user.uid); // If user is logged in, resolve with user ID
          } else {
            resolve(null); // If user is not logged in, resolve with null
          }
        }, error => {
          reject(error); // Reject if there's an error retrieving auth state
        });
      });
    }

  getCurrentCompanyData() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.authState.subscribe(user => {
        if (user) { 
         
          this.firestore.collection('/company').doc(user.uid).get()
            .subscribe(doc => {
              if (doc.exists) {
                
                resolve(doc.data());
              } else {
                reject('No such document!');
              }
            }, error => {
              reject(error);
            });
        } else {
          reject('No current user!');
        }
      });
    });
    
  }


  registerCompany(email: string, password: string, company: Company) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const userId = userCredential.user.uid; // Get the user ID from the userCredential
          company.id=userId;
          this.dataService.addCompany(company, userId)

            .then(() => {
              alert('Successful registration');
              this.router.navigate(['/Login']);
            })
            .catch(err => {
              alert('Error adding company: ' + err.message);
              this.router.navigate(['/SignUpCompany']);
            });
        } else {
          alert('User data not available');
          this.router.navigate(['/SignUpCompany']);
        }
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/SignUpCompany']);
      });
  }
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['Login']);
    },err =>{
      alert(err.message);
    })
  }
}