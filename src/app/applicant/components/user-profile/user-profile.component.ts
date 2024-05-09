import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

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
  
  constructor(private data: DataService,private route: ActivatedRoute) { }
  applicantId:any;
  editingMode = false;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit(): void {
    // this.getAllApplicants();
    this.route.paramMap.subscribe(params => {
      this.applicantId = params.get('id'); 
     if (this.applicantId) {
       this.getApplicant(); 
     }
   });
  }
  toggleEditingMode(): void {
    this.editingMode = !this.editingMode;
  }
  getApplicant(){
    this.data.getApplicant(this.applicantId).then((applicant)=>{
      console.log(applicant);
      this.applicantObj=applicant;
      console.log("successfully retrieved the applicant");
    }).catch(error =>{
      console.log("an error has occured",error);
    })
  }
  updateApplicant(): void {
    this.data.updateApplicant(this.applicantObj,this.applicantId).then(()=>{
      console.log("successfull")
    }).catch(error=>{
      console.log("Error occured while updating applicant ",error);
    })
  }

  openCV(): void {
    if (this.applicantObj.cv) {
        const filePath = this.applicantObj.cv.split('?')[0];
        const fileExtension = filePath.split('.').pop()?.toLowerCase();
        if (fileExtension) {
            const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
            const isPdf = fileExtension === 'pdf';

            if (isImage || isPdf) {
                const cvWindow = window.open('', '_blank');
                if (cvWindow) {
                    if (isImage) {
                        cvWindow.document.write(`<img src="${this.applicantObj.cv}" alt="CV">`);
                    } else if (isPdf) {
                        cvWindow.document.write(`<iframe src="${this.applicantObj.cv}" style="width:100%; height:100%;" frameborder="0"></iframe>`);
                    }
                    cvWindow.document.close();
                } else {
                    alert("Failed to open CV in a new window");
                }
            } else {
               alert("Unsupported file format. Only images (jpg, jpeg, png, gif) and PDFs are supported.");
            }
        } else {
           alert("Failed to determine file extension.");
        }
    } else {
       alert("CV URL not available");
    }
}



  updateApplicantCv(): void {
    if (this.selectedFile) {
      this.data.uploadCV(this.selectedFile).then(downloadURL => {
        console.log('CV uploaded successfully. Download URL:', downloadURL);
        alert('Uploaded successfully');
        this.applicantObj.cv=downloadURL;
        this.data.updateApplicant(this.applicantObj,this.applicantId);
      }).catch(error => {
        console.error('Error uploading CV:', error);
      });
    } else {
      console.log('No file selected.');
    }
  }

}
