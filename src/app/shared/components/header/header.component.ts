import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  
  isCompany: boolean = false;
  profileLink: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
  }

  profile(){
    this.authService.getCurrentUserId().then(id => {
      this.dataService.CheckCompanyId(id).subscribe(isCompany => {
        this.isCompany = isCompany;
        if (isCompany) {
          // If company, set profile link to CompanyProfile/:id
          this.router.navigate(['/CompanyProfile', id]);
          
        } else {
          // If applicant, set profile link to UserProfile/:id
          this.router.navigate(['/UserProfile', id]);
        }
      });
    });
  }
  logout() {
    this.authService.logout();
    }
}

