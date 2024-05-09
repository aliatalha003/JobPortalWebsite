import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';
import { map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class applicantGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: DataService,private Service: AuthService) {}
  
  
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      mergeMap(user => {
        if (user) {
          return this.userService.CheckApplicant(user.uid).pipe(
            take(1),
            mergeMap(applicantExists => {
              if (applicantExists) {
                return of(true);
              } else {
                alert('Error User not authenticated.');
                this.router.navigate(['/Login']);
                return of(false);
              }
            })
          );
        } else {
          this.router.navigate(['/Login']);
          return of(false);
        }
      })
    );
  }
}

