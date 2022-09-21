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
    //this.brZanr=0;
    this.tmpB=JSON.parse(localStorage.getItem('pretraga'));
    if(this.tmpB==false){this.basic=true;this.search=false;}
    else{this.basic=false;this.search=true;}

      
      this.topKnjige=[];
      this.bookService.getTopBooks().subscribe((b:Book[])=>{
        this.topKnjige=b;
        b.forEach((value)=>{
          this.sl.push(value.picture);
          console.log(value)
        })
        

      
      })
    
  }
  brT:number;
  tmpB:boolean;
  napred(){
      this.brT=(this.brT+1)%3;
    
  }
  nazad(){
    this.brT=((this.brT-1)+3)%3;
  }
  slD:string;
  tmp:string;
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
    this.basic=true;
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

  // publisherS:string;
  // yearStart:number;
  // yearEnd:number;
  // searchByPublisher(){
  //   this.bookS=undefined;
  //   this.bookService.searchBookByPublisher(this.publisherS).subscribe((bookS:Book[])=>{
  //     this.bookSN=bookS;
  //     //this.bookS=this.bookSN[0];
  //     if(this.bookSN==undefined){
  //       alert("Nismo pronasli vasu knjigu, probajte ponovo da ukucate");
  //       return;
  //     }
  //     else{
  //       console.log(this.bookS);
  //       this.showSearchBook=true;
  //       this.writerSearch=undefined;
  //       this.bookS.writer.forEach((value)=>{
  //         if(this.writerSearch==undefined){
  //           this.writerSearch = value.toString();       
  //         }
  //         else{
  //           this.writerSearch = this.writerSearch + ',' + value.toString() ; 
  //         }
  //       })
  //     }
      
  //   })

  // }


  // searchByYear(){
  //   this.bookS=undefined;
  //   this.bookService.searchBookByYear(this.yearStart, this.yearEnd).subscribe((bookS:Book[])=>{
  //     this.bookSN=bookS;
  //     //this.bookS=this.bookSN[0];
  //     if(this.bookSN==undefined){
  //       alert("Nismo pronasli vasu knjigu, probajte ponovo da ukucate");
  //       return;
  //     }
  //     else{
  //       console.log(this.bookS);
  //       this.showSearchBook=true;
  //       this.writerSearch=undefined;
  //       this.bookS.writer.forEach((value)=>{
  //         if(this.writerSearch==undefined){
  //           this.writerSearch = value.toString();       
  //         }
  //         else{
  //           this.writerSearch = this.writerSearch + ',' + value.toString() ; 
  //         }
  //       })
  //     }
      
  //   })

  // }

 
   topKnjige:Book[]=[];

  // imgCollection: Array<object>;

  // zanrovi:string[];
  // searchByStyle(){
  //   this.bookS=undefined;
  //   this.zanrovi = this.styleM.split(',');
  //   this.zanrovi.forEach((value)=>{
  //     console.log(value);
  //   this.bookService.searchBookByStyle(value).subscribe((bookS:Book[])=>{
  //     this.bookSN = this.bookSN.concat(bookS);
  //     this.bookSN = Array.from(this.bookSN.reduce((m, t) => m.set(t.name, t), new Map()).values());
  //    //this.bookSN = this.bookSN.filter((el, i, a) => i === a.indexOf(el));
  //     this.bookS=this.bookSN[0];
  //     if(this.bookSN==undefined){
  //       alert("Nismo pronasli vasu knjigu, probajte ponovo da ukucate");
  //       return;
  //     }
  //     else{
  //       this.showSearchBook=true;
  //       this.writerSearch=undefined;
  //       this.bookS.writer.forEach((value)=>{
  //         if(this.writerSearch==undefined){
  //           this.writerSearch = value.toString();       
  //         }
  //         else{
  //           this.writerSearch = this.writerSearch + ',' + value.toString() ; 
  //         }
  //       })
  //     }
      
  //   })
  //   })



  // }

  // zanr:string;
  // brZanr:number;
  // dodajZanr(){
    
  //   this.brZanr=this.brZanr+1;
  //   if(this.brZanr>3){
  //     alert('samo tri zanra se mogu uneti');
  //     return;
  //   }
  //   if(this.brZanr<3){
  //     if(this.styleM==""||this.styleM==undefined){this.brZanr=0;this.styleM=this.zanr;}
  //     else{

  //       this.styleM = this.styleM +","+ this.zanr;
  //     }
  //   }
  // }
  // styleM:string;
  
}
