import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/Book';
import { OID } from '../models/Oid';
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

  constructor(private observer: BreakpointObserver,private bookService:BookService,private domSanitizer:DomSanitizer, private router:Router, private userService:UserService, private userDatabaseService:UserDatabaseService) { }

  tmp:boolean;
  ngOnInit(): void {
  this.userService.getAllUsers().subscribe((user:User[])=>{
    this.users=user;
  })

  // this.showUsers=true;
  // this.updateBook=false;
  this.tmp=JSON.parse(localStorage.getItem('update'));
  if(this.tmp==true){

    this.updateBook=this.tmp;
    this.showUsers=!this.tmp;
  }
  else{
    this.updateBook=this.tmp;
    this.showUsers=!this.tmp;

  }
  this.bookService.getAllBooks().subscribe((bok:Book[])=>{
    this.books=bok;
  })
  }
  showUsers:boolean;
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
  saljiRegister(){this.regBool=true;
    this.showUsers=false;
    this.updateBook=false;
  }
  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['home']);
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


  //Knjige
  book(){
    this.writersN = this.writer.split(',');
    this.styleN = this.style.split(',');
    console.log(this.writersN);
    
    this.bookService.addBook(this.name, this.writersN,this.styleN, this.publisher, this.year, this.language, this.slika, this.number).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je dodata');
        this.ngOnInit();
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }

  name:string;
  writer:string;
  writerOld:string;
  styleOld:string;
  style:string;
  publisher:string;
  year:number;
  language:string;
  writersN:Array<String>;
  styleN:Array<String>;
  writers:Array<{id:number, text:string}>;
  styles:Array<{id:number, text:string}>;
  
  slika: string
  slikaPoruka: string
  slikaSacuvana: boolean

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

  slikaPromenjena:boolean;
  updateBook:boolean;
  bookPicture:string;
  bo:boolean;
  _id:Array<OID>;
  number:number;

  promena(book:Book){
    this.bo=true;
    this.name=book.name;
    //this.styleN = book.style;
    this.publisher=book.publisher;
    this.year = book.year;
    this.language=book.language;
    this.bookPicture=book.picture;
    //console.log(book);
    book.writer.forEach((value)=>{
      if(this.writer==undefined){
        this.writer = value.toString();       
      }
      else{
        this.writer = this.writer + ',' + value.toString() ; 
      }
      console.log(value);
    })
    
    //this.writer=book.writer;
    book.style.forEach((value)=>{
      if(this.style==undefined){
        this.style = value.toString();
      }
      else{
        this.style = this.style + ',' + value.toString();
      }
      console.log(value);
    })

    
    this._id=book._id;
    this.number = book.number;
  }

  books:Book[]=[];
  update(){
    if(this.bo!=true){
      alert("Niste izabrali korisnika");
      return;
    }
    if(this.slikaPromenjena!=true){
      this.slika=this.bookPicture;
    }
    //dovuci sve knjige iz baze
    this.writersN = this.writer.split(',');
    this.styleN = this.style.split(',');
    this.bookService.updateBook(this._id,this.name, this.writersN,this.styleN,this.publisher,this.year,this.language,this.slika, this.number).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je azurirana');
        this.slikaPromenjena=false;
        this.writer=undefined;
        this.style=undefined;
        this.bo=false;
        this.ngOnInit()
      }
      else{
        alert(resp['message']);
        this.ngOnInit()
        return;
      }
    })
  }
  regBool:boolean;
  deleteBook(bok:Book){
    this._id=bok._id;
    this.bookService.deleteBook(this._id).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je obrisana');
        this.ngOnInit();
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }
  dani:number;
  promeni(){
    this.userDatabaseService.updateDays(this.dani).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Promenjen broj dana');
        this.ngOnInit();
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }

}



