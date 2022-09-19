import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import defaultKnjiga from '../models/DefaultBook';
import defaultProfilna from '../models/DefaultProfile';
import { User } from '../models/User';
import { UserDatabaseService } from '../user-database.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userDatabaseService:UserDatabaseService, private router:Router) { }

  ngOnInit(): void {
  }
  errorMessage:string;
  username: string;
  password:string;
  upd:boolean;

  login(){
    this.userDatabaseService.login(this.username, this.password).subscribe((user:User)=>{
      if(user !=null){
        if(user.type=="admin"){
        localStorage.setItem('ulogovan', JSON.stringify(user));
        
        this.upd=false;
        localStorage.setItem('update', JSON.stringify(this.upd))
        this.router.navigate(['adminPage']);
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
