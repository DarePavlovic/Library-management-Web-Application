import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/Book';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav

  constructor(private observer: BreakpointObserver, private router:Router, private bookService:BookService) { }
  sl:string[];
  sl1:string;
  sl2:string;
  sl3:string;
  ngOnInit(): void {
    
    this.brT=0;
    this.sl=[];
      this.tmp=JSON.parse(localStorage.getItem('pretraga'));
      if(this.tmp==false){this.basic=true;this.search=false;}
      else{this.basic=true;this.search=false;}
      this.topKnjige=[];
      this.bookService.getTopBooks().subscribe((b:Book[])=>{
        this.topKnjige=b;
        b.forEach((value)=>{
          this.sl.push(value.picture);
          console.log(value)
        })
        

      //   this.imgCollection = [
      //     {
      //       image:  this.topKnjige.pop().picture,
      //       alt: 'Image 1',
      //       title: 'Image 1'
      //     }, {
      //       image:  this.topKnjige.pop().picture,
      //       title: 'Image 2',
      //       alt: 'Image 2'
      //     }, {
      //       image:  this.topKnjige.pop().picture,
      //       title: 'Image 3',
      //       alt: 'Image 3'
      //     }
      // ];
      })
    
  }
  brT:number;
  napred(){
      this.brT=(this.brT+1)%3;
    
  }
  nazad(){
    this.brT=((this.brT-1)+3)%3;
  }
  slD:string;
  tmp:boolean;
  basic:boolean;
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
    this.router.navigate(['home']);
  }
  saljiLogin(){
    this.router.navigate(['login']);
  }
  saljiRegister(){
    this.router.navigate(['register']);
  }
  saljiSearch(){
    this.search=true;
    this.basic=false;
  }

  writerSearch:string;
  bookS:Book;
  bookSN:Book[]=[];
  showSearchBook:boolean;
  showB:boolean;
  nameS:string;
  writerS:string;
  search:boolean;



searchByParam(){

  if(this.writerS == "" || this.writerS == null){
    this.searchName();
  }
  else if(this.nameS == "" || this.nameS == null){
    this.searchWriter();
  }
  else{

    this.bookS=undefined;
    this.bookService.searchBookByBoth(this.writerS,this.nameS).subscribe((bookS:Book[])=>{
      this.bookSN=bookS;
      //this.bookS=this.bookSN[0];
      if(this.bookSN==undefined ){
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
    }
    })


  }

}


  searchWriter(){
    this.bookS=undefined;
    this.bookService.searchBookByWriter(this.writerS).subscribe((bookS:Book[])=>{
      this.bookSN=bookS;
      //this.bookS=this.bookSN[0];
      if(this.bookSN==undefined){
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
    }
    })

  }

  searchName(){
    this.bookS=undefined;
    this.bookService.searchBookByName(this.nameS).subscribe((bookS:Book[])=>{
      this.bookSN=bookS;
      //this.bookS=this.bookSN[0];
      if(this.bookSN==undefined){
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
      }
      
    })

  }

  topKnjige:Book[]=[];

  imgCollection: Array<object>;
  
}
