import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BorrowBookService } from '../borrow-book.service';
import { CommentService } from '../comment.service';
import { Book } from '../models/Book';
import { BorrowBook } from '../models/BorrowBook';
import { Comment } from '../models/Comment';
import defaultKnjiga from '../models/DefaultBook';
import { JoinBook } from '../models/joinBook';
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
  constructor(private commentService:CommentService,private observer: BreakpointObserver,private domSanitizer:DomSanitizer,private bookService:BookService,private router:Router, private borrowBookService:BorrowBookService) { }
  blokiran:boolean;
  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.blokiran=this.user.blocked;
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
      this.ocena=0;
      this.tmp=0;
      this.commentService.getAllCommentsByBookID(this.bookD._id).subscribe((b:Comment[])=>{
        
        if(this.bookD.taken!=0){
          b.forEach((p)=>{
            this.tmp=this.tmp+1;
          this.ocena = this.ocena + p.grade.length;
        })
          this.ocena = this.ocena/this.tmp;
          console.log(this.ocena);
        }
        else{
          this.ocena=0;
        }
      })

    })

    
  }
  tmp:number;
  ocena:number;
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
    this.showBook=false;
    this.addBook=false;
    this.updateBook=false;
    this.bookPageShow=false;}
  }
  dodjiKuci(){
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.showBook=true;
    this.addBook=false;
    this.updateBook=false;
    this.bookPageShow=false;
  }

  
  seed:number;
  bookD:Book;
  writerD:string;
  
  book(){
    if(this.slika==null){
      this.slika=defaultKnjiga;
    }
    this.writersN = this.writerM.split(',');
    this.styleN = this.styleM.split(',');
    console.log(this.writersN);
    
    this.bookService.addBook(this.nameM, this.writersN,this.styleN, this.publisherM, this.yearM, this.languageM, this.slika, this.numberM).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je dodata');
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }

  nameM:string;
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
  updateBook:boolean;
  bookPictureM:string;
  bo:boolean;
  _id:Object;
  numberM:number;
  addHome:boolean;

  promena(book:Book){
    this.bo=true;
    this.nameM=book.name;
    //this.styleN = book.style;
    this.publisherM=book.publisher;
    this.yearM = book.year;
    this.languageM=book.language;
    this.bookPictureM=book.picture;
    //console.log(book);
    book.writer.forEach((value)=>{
      if(this.writerM==undefined){
        this.writerM = value.toString();       
      }
      else{
        this.writerM = this.writerM + ',' + value.toString() ; 
      }
      console.log(value);
    })
    
    //this.writer=book.writer;
    book.style.forEach((value)=>{
      if(this.styleM==undefined){
        this.styleM = value.toString();
      }
      else{
        this.styleM = this.styleM + ',' + value.toString();
      }
      console.log(value);
    })

    
    this._id=book._id;
    this.numberM = book.number;

  }

  books:Book[]=[];
  update(){
    if(this.bo!=true){
      alert("Niste izabrali korisnika");
      return;
    }
    if(this.slikaPromenjena!=true){
      this.slika=this.bookPictureM;
    }
    //dovuci sve knjige iz baze
    this.writersN = this.writerM.split(',');
    this.styleN = this.styleM.split(',');
    //this.styleN.length = 3;
    this.bookService.updateBook(this._id,this.nameM, this.writersN,this.styleN,this.publisherM,this.yearM,this.languageM,this.slika, this.numberM).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Knjiga je azurirana');
        this.slikaPromenjena=false;
        this.writerM=undefined;
        this.styleM=undefined;
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
    localStorage.setItem('pretraga',JSON.stringify(false));
    this.router.navigate(['home']);
  }




  defaultSlika:string;

  addB(){
    if(this.blokiran){
      alert('Ne mozete koristiti ovu funkciju');
      return;
    }
    else{
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.showBook=false;
    this.addBook=true;
    this.updateBook=false;
    this.bookPageShow=false;
    this.nameM=undefined;
    this.writerM=undefined;
    this.styleM=undefined;
    this.publisherM=undefined;
    this.yearM=undefined;
    this.languageM=undefined;
    this.numberM=undefined;
    this.slika=undefined;
    this.bo=false;}
  }

  showUpdate(){
    if(this.blokiran){
      alert('Ne mozete koristiti ovu funkciju');
      return;
    }
    else{
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.showBook=false;
    this.addBook=false;
    this.updateBook=true;
    this.bookPageShow=false;}
  }


  showProf:boolean;
  history:boolean;
  menjaj:boolean;
  zaduzene:boolean;
  search:boolean;
  showB:boolean;
  bookPageShow:boolean;
  showProfile(){
    this.showProf=true;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=false;
    this.showB=false;
    this.showBook=false;
    this.addBook=false;
    this.updateBook=false;
    this.bookPageShow=false;
  }
  showSearch(){
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=false;
    this.search=true;
    this.showB=false;
    this.showBook=false;
    this.addBook=false;
    this.updateBook=false;
    this.bookPageShow=false;
  }

  
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
    this.showBook=false;
    this.addBook=false;
    this.updateBook=false;
    this.bookPageShow=true;}
  }

  writerSearch:string;
  bookS:Book;
  bookSN:Book[]=[];
  showSearchBook:boolean;
  nameS:string;
  writerS:string;

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
    this.showBook=false;
    this.addBook=false;
    this.updateBook=false;
    this.bookPageShow=false;
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
  showZaduzene(){
    this.joinBooks=[];
    this.showProf=false;
    this.history=false;
    this.menjaj=false;
    this.zaduzene=true;
    this.search=false;
    this.showB=false;
    this.showBook=false;
    this.addBook=false;
    this.updateBook=false;
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


}
