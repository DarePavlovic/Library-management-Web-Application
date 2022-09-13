import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserDatabaseService } from '../user-database.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav

  constructor(private observer: BreakpointObserver, private router:Router, private userService:UserService, private userDatabaseService:UserDatabaseService) { }

  ngOnInit(): void {
  this.userService.getAllUsers().subscribe((user:User[])=>{
    this.users=user;
  })
  }

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

  saljiKuci(){
    this.router.navigate(['adminPage']);
  }
  saljiAzuriraj(){
    this.router.navigate(['userUpdate']);
  }
  saljiRegister(){
    this.router.navigate(['register']);
  }
  saljiBrisi(){
    this.router.navigate(['user']);
  }
  username:string;


  deleteUser(user:User){
    this.userService.deleteUser(user.username).subscribe((resp)=>{
      alert(resp['message']);
      this.ngOnInit()
    })
  }

  message:string;

  registerUser(u:User){
    this.userDatabaseService.register(u.firstname,u.lastname,u.username,u.password, u.address, u.phone_number, u.email, u.picture).subscribe(resp=>{
      if(resp['message']=='ok'){
          this.userService.deleteUser(u.username).subscribe((resp)=>{
            if(resp['message']=='ok'){
              alert('User added');
              this.ngOnInit()
            }
            else{
              alert(resp['message']);
              this.ngOnInit()
              return;
            }
          })
       
       }
      else{
        alert(resp['message']);
        this.ngOnInit()
         return;
      }
     })

  }

  users:User[] = [];

}
