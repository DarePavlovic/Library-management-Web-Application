import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookWService } from '../book-w.service';
import { BookService } from '../book.service';
import { BorrowBookService } from '../borrow-book.service';
import { CommentService } from '../comment.service';
import { Book } from '../models/Book';
import { BorrowBook } from '../models/BorrowBook';
import { Comment } from '../models/Comment';
import defaultKnjiga from '../models/DefaultBook';
import { JoinBook } from '../models/joinBook';
import { User } from '../models/User';
import { UserDatabaseService } from '../user-database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  constructor(private commentService:CommentService,private observer: BreakpointObserver,private borrowBookService:BorrowBookService,private bookWService:BookWService,private domSanitizer:DomSanitizer,private bookService:BookService, private router:Router, private userDatabaseService:UserDatabaseService) { }

  dodat:string;
  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.blokiran=this.user.blocked;
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
      this.ocena=0;
      this.tmp=0;
      this.commentService.getAllCommentsByBookID(this.book._id).subscribe((b:Comment[])=>{
        
        if(this.book.taken!=0){
          b.forEach((value)=>{
            this.tmp=this.tmp+1;
          this.ocena = this.ocena + value.grade.length;
        })
          this.ocena = this.ocena/this.tmp;
          console.log(this.ocena);
        }
        else{
          this.ocena=0;
        }
      })
    })

    if(this.showSearchBook){
    this.showB=false;
    }
    else{
    this.showB=true;
    }

    if(this.user.book!=undefined){
      this.dodat = "Obavestenje: Dodate su vase knjige:" + this.user.book;
    }
    else{
      this.dodat="";
    }
    
  }

  ocena:number;
  tmp:number;
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

    // this.router.navigate(['change']);
    if(this.blokiran){
      alert('Ne mozete koristiti ovu funkciju');
      return;
    }
    else{
    this.showProf=false;
    this.history=false;
    this.menjaj=true;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.bookPageShow=false;
    this.addBook=false;
  }
  }
  menjaj:boolean;
  dodjiKuci(){
    
    this.ngOnInit();
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=true;
    this.bookPageShow=false;
    this.addBook=false;

  }

  skociNaKnjigu(bok:Book){
    if(this.blokiran){
      alert('Ne mozete koristiti ovu funkciju');
      return;
    }
    else{
    localStorage.clear();
    localStorage.setItem('knjiga',JSON.stringify(bok));
    localStorage.setItem('ulogovan', JSON.stringify(this.user));
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.addBook=false;
    this.bookPageShow=true;}
    //this.router.navigate(['bookPage']);
  }
  showProf:boolean;
  history:boolean;

  showProfile(){
    this.showProf=true;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.addBook=false;
    this.bookPageShow=false;
  }
 

  showSearch(){
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=true;
    this.showB=false;
    this.bookPageShow=false;
    this.addBook=false;
  }
  odjava(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('pretraga',JSON.stringify(false));
    this.router.navigate(['home']);
  }

  bookPageShow:boolean;

  blokiran:boolean;

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
  writerSearch:string;
  bookS:Book;
  bookSN:Book[]=[];
  showSearchBook:boolean;
  showB:boolean;
  nameS:string;
  writerS:string;
  search:boolean;

  borrowedBooks:BorrowBook[]=[];
  bookB:Book[]=[];
  joinBooks:JoinBook[]=[];
  joinBook:JoinBook;

  showHistory(){
    this.joinBooks=[];
    this.showProf=false;
    this.history=true;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.bookPageShow=false;
    this.addBook=false;
    this.borrowBookService.getAllBorrowedBooks(this.user.username).subscribe((borr:BorrowBook[])=>{
      this.borrowedBooks=borr;
      console.log(this.borrowedBooks);
      this.borrowedBooks.forEach((value)=>{
        this.bookService.getBookByID(value.bookId).subscribe((bok:Book)=>{
          this.joinBook = new JoinBook();
          this.joinBook._id=bok._id;
          this.joinBook.name=bok.name;
          this.joinBook.writer=bok.writer;
          this.joinBook.startDate=value.startDate;
          this.joinBook.endDate=value.endDate;
          this.joinBooks.push(this.joinBook);
        })
      })

    })
  }

  vodi(id){
    this.bookService.getBookByID(id).subscribe((b:Book)=>{
      this.skociNaKnjigu(b);
    })
  }

  sortBook:JoinBook[]=[];
  sorttmp:Book[]=[];
  sortName(){
    this.sortBook=[];
    this.sorttmp=[];
    this.showProf=false;
    this.history=true;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.addBook=false;
    this.bookPageShow=false;
    this.bookService.getBorrowSortName().subscribe((bs:Book[])=>{
      this.sorttmp=bs;

      this.joinBooks.forEach((k)=>{
        this.sortBook.push(k);
      })
      this.joinBooks=[];
      this.sorttmp.forEach((value)=>{
          this.sortBook.forEach((j)=>{
            if(value._id==j._id){
              this.joinBooks.push(j);
              console.log(j)
            }
          })
        })
    })

  }

  sortWrite(){
    

    this.sortBook=[];
    this.sorttmp=[];
    this.showProf=false;
    this.history=true;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.addBook=false;
    this.bookPageShow=false;
    this.bookService.getBorrowSortWriter().subscribe((bs:Book[])=>{
      this.sorttmp=bs;
      
      this.joinBooks.forEach((k)=>{
        this.sortBook.push(k);
      })
      this.joinBooks=[];
      this.sorttmp.forEach((value)=>{
          this.sortBook.forEach((j)=>{
            if(value._id==j._id){
              this.joinBooks.push(j);
              console.log(j)
            }
          })
        })
    })

  }

  sortStart(){
    this.joinBooks=[];
    this.showProf=false;
    this.history=true;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.bookPageShow=false;
    this.addBook=false;
    this.borrowBookService.getBorrowSortStart(this.user.username).subscribe((borr:BorrowBook[])=>{
      this.borrowedBooks=borr;
      console.log(this.borrowedBooks);
      this.borrowedBooks.forEach((value)=>{
        this.bookService.getBookByID(value.bookId).subscribe((bok:Book)=>{
          this.joinBook = new JoinBook();
          this.joinBook._id=bok._id;
          this.joinBook.name=bok.name;
          this.joinBook.writer=bok.writer;
          this.joinBook.startDate=value.startDate;
          this.joinBook.endDate=value.endDate;
          this.joinBooks.push(this.joinBook);
        })
      })

    })

  }


  
  brD1:number;
  brD2:number;
  brD3:number;
  zaduzene:boolean;
  showZaduzene(){
    this.joinBooks=[];
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=true;
    this.search=false;
    this.showB=false;
    this.addBook=false;
    this.bookPageShow=false;
    this.borrowBookService.getAllBorrowBooks(this.user.username).subscribe((borr:BorrowBook[])=>{
      this.borrowedBooks=borr;
      console.log(this.borrowedBooks);
      this.borrowedBooks.forEach((value)=>{
        this.bookService.getBookByID(value.bookId).subscribe((bok:Book)=>{
          this.joinBook = new JoinBook();
          this.joinBook._id=bok._id;
          this.joinBook.name=bok.name;
          this.joinBook.writer=bok.writer;
          this.joinBook.startDate=value.startDate;
          this.joinBook.endDate=value.endDate;
          this.joinBook.picture=bok.picture;
          this.joinBook.extended=value.extended;
          let dat3=new Date(value.endDate);
          this.joinBook.jos = (-1)* Math.floor((Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - Date.UTC(dat3.getFullYear(), dat3.getMonth(), dat3.getDate()) ) /(1000 * 60 * 60 * 24));
          this.joinBooks.push(this.joinBook);
        })
      })
    })
  }

  zakasnio(a){
    if(a<0){
      return true;
    }
    else {return false;}
  }

  proveriTrue(a:boolean){
    return a==true;
  }

  vrati(id){
    this.borrowBookService.returnBorrowBook(this.user.username,id).subscribe(resp=>{
      if(resp['message']=='ok'){ alert('Knjiga je vracena'); window.location.reload();}
      else {alert(resp['message']); return;}
    })

  }
  produzi(id,broj, b){
    if(b==true){
      alert('Vec ste produzili ovu knjigu, nije moguce');
      return;
    }
    if(broj>0){
      alert('Mozete produziti rok tek onda kad vam istekne prvi period');
      return;
    }
    
    let start= new Date();
    let date = new Date();
    date.setDate( date.getDate() + this.user.extendNumber);
    this.borrowBookService.updateBorrowBook(this.user.username,id,start, date).subscribe(resp=>{
      if(resp['message']=='ok'){ alert('Knjiga je produzena');this.ngOnInit();}
      else {alert(resp['message']); return;}
    })
    

  }
  addB(){
    this.addBook=true;
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.bookPageShow=false;
  }
  addBook:boolean;
  bookW(){
    if(this.slika==null){
      this.slika=defaultKnjiga;
    }
    this.writersN = this.writerM.split(',');
    this.styleN = this.styleM.split(',');
    console.log(this.user.username);
    
    this.bookWService.addBook(this.user.username,this.nameM, this.writersN,this.styleN, this.publisherM, this.yearM, this.languageM, this.slika, this.numberM).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je dodata, sacekajte da vidite da li ce Vasa knjiga biti prihvacena');
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }

  nameM:string;
  numberM:number;
  writerM:string;
  writerOld:string;
  styleOld:string;
  styleM:string;
  publisherM:string;
  yearM:number;
  languageM:string;
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
  
}
