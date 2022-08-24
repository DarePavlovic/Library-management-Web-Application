import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../models/User'
import {  Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  errorMessage:string;
  username: string;
  password:string;
 

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user !=null){
        localStorage.setItem('ulogovan', JSON.stringify(user));
        this.router.navigate(['user']);
      }
      else{
        this.errorMessage="Wrong username or password";
      }
      
    })
  }

  
  
  
}
