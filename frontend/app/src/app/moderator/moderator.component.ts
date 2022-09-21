import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/Book';
import defaultKnjiga from '../models/DefaultBook';
import { OID } from '../models/Oid';
import { User } from '../models/User';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  constructor(private observer: BreakpointObserver,private domSanitizer:DomSanitizer,private bookService:BookService,private router:Router) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.username=this.user.username;
    this.fullname = this.user.firstname + ' ' +this.user.lastname;
    this.email = this.user.email;
    this.picture = this.user.picture;
    this.addHome=true;
    this.showBook=true;


    this.bookService.getAllBooks().subscribe((bok:Book[])=>{
      this.books=bok;

      this.seed = ((new Date().getDate())*(new Date().getFullYear())*(new Date().getMonth())+1)%bok.length;
      this.writerD=undefined;
      this.bookD=this.books[this.seed];
      this.bookD.writer.forEach((value)=>{
        if(this.writerD==undefined){
          this.writerD = value.toString();       
        }
        else{
          this.writerD = this.writerD + ',' + value.toString() ; 
        }
      })
    })

    
  }
  showBook:boolean;
  user:User;
  email:string;
  username:string;
  fullname:string;
  picture:string;
  addBook:boolean;
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
    
    this.router.navigate(['moderator']);
  }

  showProfile(){
    
    this.router.navigate(['userProfile']);
  }
  seed:number;
  bookD:Book;
  writerD:string;
  // unesiW(){
  //   if(this.writer!=this.writerOld){
  //     this.writerOld=this.writer;
  //     this.idW=this.idW+1;
  //     this.writers.push({'id':this.idWO,'text':this.writer});
  //     this.idWO=this.idW;
  //     console.log(this.writers);
  //     this.writer="";
  //   }
  // }
  // unesiS(){
  //   if(this.style!=this.styleOld){
  //     this.styleOld=this.style;
  //     this.idS=this.idS+1;
  //     this.styles.push({'id':this.idSO,'text':this.style});
  //     console.log(this.styles);
  //     this.idSO=this.idS;
  //     this.style="";
  //   }
  // }

  // idW:number;
  // idWO:number;
  // idS:number;
  // idSO:number;
  book(){
    if(this.slika==null){
      this.slika=defaultKnjiga;
    }
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
  _id:Object;
  number:number;
  addHome:boolean;

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
    //this.styleN.length = 3;
    this.bookService.updateBook(this._id,this.name, this.writersN,this.styleN,this.publisher,this.year,this.language,this.slika, this.number).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je azurirana');
        this.slikaPromenjena=false;
        this.writer=undefined;
        this.style=undefined;
        this.bo=false;
        window.location.reload();
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }


  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['home']);
  }




  defaultSlika:string;

  addB(){
    this.addBook=true;
    this.showBook=false;
    this.updateBook=false;
    this.name=undefined;
    this.writer=undefined;
    this.style=undefined;
    this.publisher=undefined;
    this.year=undefined;
    this.language=undefined;
    this.number=undefined;
    this.slika=undefined;
    this.bo=false;
  }
  
}
