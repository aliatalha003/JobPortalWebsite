import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';

  constructor(private auth:AuthService){}


  ngOnInit(): void {
  }
 
  login(){
    if(this.email=='' ||this.password==''  ){
      alert('Please enter all the values')
      return ;
    }
    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';

  }
  
}
