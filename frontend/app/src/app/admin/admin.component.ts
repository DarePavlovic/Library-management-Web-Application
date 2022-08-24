import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }
  errorMessage:string;
  username: string;
  password:string;
 

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user !=null){
        if(user.type=="admin"){
        localStorage.setItem('ulogovan', JSON.stringify(user));
        this.router.navigate(['user']);
        }
        else{
          this.errorMessage="Only admin can log in";
        }
      }
      else{
        this.errorMessage="Wrong username or password";
      }
      
    })
  }


}
