import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../models/User'
import {  Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav

  constructor(private userService:UserService, private router:Router, private observer: BreakpointObserver) { }

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
  saljiKuci(){
    this.router.navigate(['home']);
  }
  saljiLogin(){
    this.router.navigate(['login']);
  }
  saljiRegister(){
    this.router.navigate(['register']);
  }
  saljiSearch(){
    this.router.navigate(['user']);
  }

  
  
  //za sidenavigation
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }
      else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
    })
  }
}
