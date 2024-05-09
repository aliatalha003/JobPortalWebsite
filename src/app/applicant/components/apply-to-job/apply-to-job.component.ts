import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Job } from '../../../jobs/models/job';
import { DataService } from '../../../shared/services/data.service';
import { Applicant } from '../../models/applicant';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrl: './apply-to-job.component.css'
})
export class ApplyToJobComponent implements OnInit{
  jobId: string | undefined;
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
  cvFile!: File;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private router: Router,
    private dataService:DataService
  ) {
    this.route.params.subscribe(params => {
      this.jobId = params['id']; // Get the job ID from the URL
    });
  }
  ngOnInit(): void {
    this.authService.getCurrentApplicantData()
      .then(applicantData => {
        this.applicantObj = applicantData;
      })
      .catch(error => {
        console.error('Error fetching applicant data:', error);
      });
  }
  applyForJob() {
    this.authService.getCurrentUserId()
      .then(userId => {
        if (userId) {
          const userReference = userId;
          this.firestore.collection('Job').doc(this.jobId).get().subscribe(jobDoc => {
            console.log(this.jobId);
            const jobData = jobDoc.data() as Job;
            const applicantApplied = jobData.applicantApplied || [];
              if (!applicantApplied.includes(userReference)) {
              applicantApplied.push(userReference);

              this.dataService.UpdateApplicantAppliedinJob (this.jobId,applicantApplied)
                .then(() => {
                  this.dataService.updateApplicant(this.applicantObj, userId)
                  this.updateApplicantCv();
                  console.log('Applied for the job successfully!');
                  alert('User successfully applied for this job');
                  setTimeout(() => {
                    this.router.navigateByUrl(`/JobDetails/${this.jobId}`);
                  }, 500);
                })
                .catch(error => {
                  console.error('Error applying for the job:', error);
                });
            } else {
              alert('User already applied for this job.');
            }
          });
        } else {
          console.log('No user is currently logged in.');
        }
      })
      .catch(error => {
        console.error('Error getting current user ID:', error);
      });
  }
selectedFile: File | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}
updateApplicantCv(): void {
  if (this.selectedFile) {
    this.dataService.uploadCV(this.selectedFile).then(downloadURL => {
      console.log('CV uploaded successfully. Download URL:', downloadURL);
      // alert('Uploaded successfully');
      this.applicantObj.cv=downloadURL;
      this.dataService.updateApplicant(this.applicantObj,this.applicantObj.id);
    }).catch(error => {
      console.error('Error uploading CV:', error);
    });
  } else {
    console.log('No file selected.');
  }
}

}
