import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav

  constructor(private observer: BreakpointObserver,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.username=this.user.username;
    this.fullname = this.user.firstname + ' ' +this.user.lastname;
    this.picture = this.user.picture;
    
    this.email = this.user.email;
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
  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['home']);
  }
  user:User;
  username:string;
  email:string;
  fullname:string;
  picture:string;
  pass1:string;
  pass2:string;
  pass3:string;
  message:string;
  passPattern = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,12}$");
  
  menjajPass(){
    this.router.navigate(['change']);
  }
  dodjiKuci(){
    
    this.router.navigate(['user']);
  }

  showProfile(){
    this.router.navigate(['userProfile']);
  }

  promeniLozinku(){
    if(!this.passPattern.test(this.pass2)){
      this.message = "Lozinka mora biti izmejdu 8 i 12 karaktera i treba satojati u sebi malo, veliko slovo, broj i neki od znakova: @$!%*#?&";
      return;
    }
    if(this.pass1==this.pass2){
      this.message="Lozinke su iste!";
      return;
    }
    if(this.pass2!=this.pass3){
      this.message="Unete nove lozinke nisu iste!";
      return;
    }


    this.userService.getPassword(this.username, this.pass1).subscribe((us:User)=>{
      if(us!=null){
        this.userService.changePassword(this.username, this.pass2).subscribe(resp=>{
          if(resp['message']=='ok'){
           
             this.message = 'Promenjena lozinka';
           }
          else{
             this.message = 'Nije uspelo';
             return;
          }
         })
      }
      else{
        this.message = 'Pogresna lozinka';
        return;
      }
    })
  }

}
