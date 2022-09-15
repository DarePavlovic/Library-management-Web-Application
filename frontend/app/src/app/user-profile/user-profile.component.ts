import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserDatabaseService } from '../user-database.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  constructor(private userDatabaseService:UserDatabaseService,private observer: BreakpointObserver,private domSanitizer:DomSanitizer, private router:Router) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.username=this.user.username;
    this.fullname = this.user.firstname + ' ' +this.user.lastname;
    this.email = this.user.email;
    this.picture = this.user.picture;
    this.firstname=this.user.firstname;
    this.lastname=this.user.lastname;
    this.address=this.user.address;
    this.phone_number=this.user.phone_number;
    this.type=this.user.type;
  }
  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['home']);
  }

  user:User;
  email:string;
  username:string;
  fullname:string;
  picture:string;
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

  menjajPass(){
    this.router.navigate(['change']);
  }
  dodjiKuci(){
    
    this.router.navigate(['user']);
  }

  showProfile(){
    this.router.navigate(['userProfile']);
  }

  slika: string
  slikaPoruka: string
  slikaSacuvana: boolean
  slikaPromenjena
  slikaDodata(fileInput: any) {
    this.slikaPoruka = null;
    this.slika = null
    this.slikaSacuvana = false
    if (fileInput.target.files && fileInput.target.files[0]) {


      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {


            const imgBase64Path = e.target.result;
            this.slika = imgBase64Path;
            this.slikaSacuvana = true;
            this.slikaPromenjena=true;
            return true
            // this.previewImagePath = imgBase64Path;
          
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  putdoslike() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.slika)
  }



  firstname:string;
  lastname:string;
  address:string;
  phone_number:number;
  type:string;
  bo:boolean;
  promena(){
    this.bo=true;
    this.ngOnInit();
  }
  
  update(){
    console.log(this.type);
    if(this.slikaPromenjena!=true){
      this.slika=this.picture;
    }
    this.userDatabaseService.updateProfile(this.firstname, this.lastname,this.username,this.address,this.phone_number,this.email,this.slika,this.type).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('User updated');
        this.slikaPromenjena=false;
        this.bo=false;
        
        
      }
      else{
        alert(resp['message']);
        this.ngOnInit()
        return;
      }
    })
  }

}
