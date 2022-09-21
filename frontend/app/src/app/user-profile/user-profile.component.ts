import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserDatabaseService } from '../user-database.service';
import Chart from 'chart.js/auto';
import { BorrowBookService } from '../borrow-book.service';
import { BorrowBook } from '../models/BorrowBook';
import { BookService } from '../book.service';
import { Book } from '../models/Book';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  constructor(private userDatabaseService:UserDatabaseService,private bookService:BookService,private borrowBookService:BorrowBookService,private observer: BreakpointObserver,private domSanitizer:DomSanitizer, private router:Router) { }

  ngOnInit(): void {

    this.tm=JSON.parse(localStorage.getItem('ulogovan'));
    
    this.userDatabaseService.getUser(this.tm.username).subscribe((u:User)=>{
      this.user=u;
      this.username=this.user.username;
    this.fullname = this.user.firstname + ' ' +this.user.lastname;
    this.email = this.user.email;
    this.picture = this.user.picture;
    this.firstname=this.user.firstname;
    this.lastname=this.user.lastname;
    this.address=this.user.address;
    this.phone_number=this.user.phone_number;
    this.type=this.user.type;
    })

    this.borrowBookService.getAllBorrowedBooks(this.tm.username).subscribe(((bb:BorrowBook[])=>{
      bb.forEach((value)=>{
        this.datum = new Date();
        this.datum.setFullYear(new Date().getFullYear()-1);
        
        let dat3=new Date(value.endDate);
        this.prek = (-1)* Math.floor((Date.UTC(dat3.getFullYear(), dat3.getMonth(), dat3.getDate()) - Date.UTC(this.datum.getFullYear(), this.datum.getMonth(), this.datum.getDate()) ) /(1000 * 60 * 60 * 24));      
        if(this.prek<=0){
          this.mesec[dat3.getMonth()]=this.mesec[dat3.getMonth()]+1;
          
          this.bookService.getBookByID(value.bookId).subscribe((b:Book)=>{
            b.style.forEach((v)=>{
              console.log(v.toString());
              let br=0;
              this.zanroviN.forEach((k)=>{
                if(k==v.toString()){
                  this.zanrovi[br]=this.zanrovi[br] + 1;
                }
                br=br+1;
              })
              //this.zanrovi[v.toString()]=this.zanrovi[v.toString()] + 1;
            })
          })
        }

      })
      
    }))
    
    
  }
  pokaziGrafike(){
    this.createChart();
    this.createChart2();
  }
  datum:Date;
  prek:number;
  prekBool:boolean;
  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['home']);
  }
  public chart: any;
  public chart2:any;
  user:User;
  tm:User;
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
  slikaPromenjena:boolean = false;
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
  }
  
  update(){
    
    if(this.slikaPromenjena!=true){
      this.slika=this.picture;
    }
    this.userDatabaseService.updateProfile(this.firstname, this.lastname,this.username,this.address,this.phone_number,this.email,this.slika,this.type).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('User updated');
        this.slikaPromenjena=false;
        this.picture=this.slika;
        this.user.picture = this.picture;
        localStorage.setItem('ulogovan',JSON.stringify(this.user));
        this.bo=false;
         this.ngOnInit();
        
        
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }

  mesec:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
  mesecN:string[]=['jan','feb','mart','apr','maj','jun','jul','avgust','sept','okt','novmb','decem'];
  zanrovi:number[]=[0,0,0,0,0,0,0,0,0,0,0];
  zanroviN:string[]=["Triler","Roman","Komedija", "Misterija", "Fantastika", "Bajka","Putopis","Dnevnik","Sveta pisma","Fikcija","Manga"];


  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.mesecN, 
	       datasets: [
          {
            label: "Citalacke navike po mesecima",
            data: this.mesec,
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:3.5
      }
      
    });
  }
    createChart2(){
    this.chart2 = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.zanroviN, 
	       datasets: [
          {
            label: "Citalacke navike po zanrovima",
            data: this.zanrovi,
            backgroundColor: 'green'
          } 
        ]
      },
      options: {
        aspectRatio:3.5
      }
      
    });
  }

}
