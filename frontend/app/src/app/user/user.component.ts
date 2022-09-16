import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/Book';
import { User } from '../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  constructor(private observer: BreakpointObserver,private bookService:BookService, private router:Router) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.username=this.user.username;
    this.fullname = this.user.firstname + ' ' +this.user.lastname;
    this.email = this.user.email;
    this.picture = this.user.picture;
    this.bookService.getAllBooks().subscribe((book:Book[])=>{
      this.books=book;
      this.seed = ((new Date().getDate())*(new Date().getFullYear())*(new Date().getMonth())+1)%book.length;
      this.writer = undefined;
      this.book=this.books[this.seed];
      this.book.writer.forEach((value)=>{
        if(this.writer==undefined){
          this.writer = value.toString();       
        }
        else{
          this.writer = this.writer + ',' + value.toString() ; 
        }
      })
    })

    if(this.showSearchBook){
    this.showB=false;
    }
    else{
    this.showB=true;
    }
    
  }

  showBook(){
    console.log(this.seed);
    console.log(this.book);
  }

  writer:String;
  seed:number;
  book:Book;
  books:Book[]=[];
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

  skociNaKnjigu(bok:Book){
    localStorage.setItem('knjiga',JSON.stringify(bok));

    localStorage.setItem('ulogovan', JSON.stringify(this.user));
    this.bookPageShow=true;
    this.search=false;
    this.showB=false;
    //this.router.navigate(['bookPage']);
  }

  showProfile(){
    
    this.router.navigate(['userProfile']);
  }

  odjava(){
    localStorage.removeItem('ulogovan')
    this.router.navigate(['home']);
  }

  bookPageShow:boolean;

  searchWriter(){
    this.bookS=undefined;
    this.bookService.searchBookByWriter(this.writerS).subscribe((bookS:Book[])=>{
      this.bookSN=bookS;
      this.bookS=this.bookSN[0];
      if(this.bookS==undefined){
        alert("Nismo pronasli vasu knjigu, probajte ponovo da ukucate");
        return;
      }
      else{
      console.log(this.bookS);
      this.showSearchBook=true;
      this.writerSearch=undefined;
      this.bookS.writer.forEach((value)=>{
        if(this.writerSearch==undefined){
          this.writerSearch = value.toString();       
        }
        else{
          this.writerSearch = this.writerSearch + ',' + value.toString() ; 
        }
      })
      this.ngOnInit();
    }
    })

  }

  searchName(){
    this.bookS=undefined;
    this.bookService.searchBookByName(this.nameS).subscribe((bookS:Book[])=>{
      this.bookSN=bookS;
      this.bookS=this.bookSN[0];
      if(this.bookS==undefined){
        alert("Nismo pronasli vasu knjigu, probajte ponovo da ukucate");
        return;
      }
      else{
        console.log(this.bookS);
        this.showSearchBook=true;
        this.writerSearch=undefined;
        this.bookS.writer.forEach((value)=>{
          if(this.writerSearch==undefined){
            this.writerSearch = value.toString();       
          }
          else{
            this.writerSearch = this.writerSearch + ',' + value.toString() ; 
          }
        })
        this.ngOnInit();
      }
      
    })

  }
  writerSearch:string;
  bookS:Book;
  bookSN:Book[]=[];
  showSearchBook:boolean;
  showB:boolean;
  nameS:string;
  writerS:string;
  search:boolean;
}
