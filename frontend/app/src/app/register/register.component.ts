import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {FormControl, Validators} from '@angular/forms';
import { User } from '../models/User';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav

  constructor(private userService:UserService, private router:Router, private observer: BreakpointObserver) { }


  ngOnInit(): void {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  username: string;
  password:string;
  passwordR:string;
  street:string;
  city:string;
  firstname:string;
  lastname:string;
  mail:string;
  phone_number:string;
  passPattern = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,12}$");
  
  passMessage:string;
  emailMessage:string;
  passRepeat:string;


  address:string;
  phone:number;
  picture:string;
  message:string;

  register(){
    this.mail = this.email.value;
    
    console.log(this.mail);
    console.log(this.firstname);
    if(this.firstname==null || this. lastname==null || this.username==null 
    || this.password==null || this.passwordR==null || this.city ==null
    || this.street==null || this.phone_number==null|| this.email.value==""){
      alert("You must fill all field for sign up");
      return;
      this.message=="Sva polja su obavezna"
    }
    if(this.password!=this.passwordR){
      this.passRepeat="Lozinke nisu iste!";
      return;
    }
    if(!this.passPattern.test(this.password)){
      this.passMessage = "Lozinka mora biti izmejdu 8 i 12 karaktera i treba satojati u sebi malo, veliko slovo, broj i neki od znakova: @$!%*#?&";
      return;
    }
    // if(!this.emailPattern.test(this.mail)){
      //this.emailMessage="Niste dobro upisali mejl";
      //return;
    
    this.address = this.street + ', ' + this.city;
    this.phone = parseInt(this.phone_number);
    this.picture = "/" + this.username + "Picture";
    
      this.userService.getUser(this.firstname).subscribe((us:User)=>{
        if(us==null){
          this.userService.getEmail(this.username, this.mail).subscribe((use:User)=>{
            if(use==null){
               this.userService.register(this.firstname, this.lastname, this.username, this.password, this.address, this.phone, this.mail, this.picture).subscribe(resp=>{
                 if(resp['message']=='ok'){
                    this.message = 'User added';
                  }
                 else{
                    this.message = 'Something went wrong';
                    return;
                 }
                })
            }
            else{
              this.message="This email is used by another user";
            }
          })
        }
        else{
          this.message="This username is used by another user";
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
