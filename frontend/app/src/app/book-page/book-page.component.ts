import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BorrowBookService } from '../borrow-book.service';
import { CommentService } from '../comment.service';
import { Book } from '../models/Book';
import { BorrowBook } from '../models/BorrowBook';
import { Comment } from '../models/Comment';
import { Reservation } from '../models/Reservation';
import { User } from '../models/User';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  maxChars:number

  constructor(private borrowBookService:BorrowBookService,private reservationService:ReservationService,private commentService:CommentService, private bookService:BookService) { }

  ngOnInit(): void {
    this.book=undefined;
    this.maxChars=1000;
    this.book=JSON.parse(localStorage.getItem('knjiga'));
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.writerBook=undefined;
    this.styleBook=undefined;
    this.book.writer.forEach((value)=>{
      if(this.writerBook==undefined){
        this.writerBook = value.toString();       
      }
      else{
        this.writerBook = this.writerBook + ',' + value.toString() ; 
      }
    })
    this.book.style.forEach((value)=>{
      if(this.styleBook==undefined){
        this.styleBook = value.toString();       
      }
      else{
        this.styleBook = this.styleBook + ',' + value.toString() ; 
      }
    })
    if(this.book.number>0){
      this.uzmi=true;
    }
    this.uzmi=true;

    this.commentService.getAllCommentsByBookID(this.book._id).subscribe((c:Comment[])=>{
      this.comments=c;
      if(c!=null){
        this.tabela=true;
      }
    })

    this.borrowBookService.getAllBorrowedBooks(this.user.username).subscribe((bb:BorrowBook[])=>{
      console.log
      bb.forEach((value)=>{
        if(value.bookId==this.book._id){
          this.ocena=true;
        }
      })
    })

    this.commentService.getCommentByBookID(this.book._id, this.user.username).subscribe((co:Comment)=>{
      if(co==null){this.btnB=false; this.da="ne";}
      else{
        this.gradeN = co.grade.length;
        this.comme = co.commentS;
        this.btnB = true;
      }
      if(co.updated){
        this.da="da";
      }
      else{
        this.da="ne";
      }
    })

  }
  da:string;
  btnB:boolean;
  ocena:boolean;
  tabela:boolean;
  uzmi:boolean;
  writerBook:string;
  styleBook:string;
  book:Book;
  user:User;
  startDate:Date;
  endDate:Date;
  borrow:BorrowBook[]=[];
  tmpB:boolean;
  zaduzi(){
    this.bookService.getBookByID(this.book._id).subscribe((bok:Book)=>{
      if(bok.number>0){
        this.borrowBookService.getAllBorrowBooks(this.user.username).subscribe((borrowB:BorrowBook[])=>{
          this.borrow=borrowB;
          if(this.borrow.length>0){
            this.borrow.forEach((value)=>{
              if(value.bookId==this.book._id){
                this.tmpB=true;
              }
            })
          }
          if(this.borrow.length>=3){
            alert('Imate 3 vec zaduzene knjige, molim Vas neku oduzite');
            return;
          }
          else if(this.tmpB){
            alert('Vec ste zaduzili ovu knjigu')
            return;
          }
          else{
            this.startDate=new Date();
            this.endDate = new Date();
            this.endDate.setDate(this.startDate.getDate()+14);
              
            this.borrowBookService.addBorrowBook(this.user.username, this.book._id, this.startDate, this.endDate).subscribe(resp=>{
              if(resp['message']=='ok'){
                this.bookService.takeBook(this.book._id,this.book.number-1,this.book.taken+1).subscribe(resp=>{
                  if(resp['message']=='ok'){
                    alert('Zaduzili ste knjigu');
                    this.ngOnInit();
                  }
                  else{
                    alert(resp['message']);
                    return;
                  }
                })
              }
              
            })
          }
        })
      }
      else{
        this.reservationService.getAllReservation().subscribe((r:Reservation[])=>{
          console.log(r);
          if(r.length==0){
            this.reservationService.addReservation(this.user.username, bok._id,0).subscribe(res=>{
              if(res['message']=='ok'){
                alert('Dodata je rezervacija');
                window.location.reload();
              }
              else{alert(res['message']); return;}
            })
          }
          else{
            this.reservationService.getTicket().subscribe((res:Reservation)=>{
              this.ticket=res.ticket;
            
            this.reservationService.addReservation(this.user.username, bok._id,this.ticket+1).subscribe(res=>{
              if(res['message']=='ok'){
                alert('Dodata je rezervacijaa');
                window.location.reload();
              }
              else{alert(res['message']); return;}
            })
          })
          }
        })
      }
    })
    
    
  }

  comments:Comment[]=[];
  gradeN:number;
  gradeS:string;
  comme:string;
  ticket:number;

  dodajKomentar(){
    this.gradeS="";
    for(let i=0;i<this.gradeN;i++){
      this.gradeS = this.gradeS + '*';
    }
    this.commentService.getCommentByBookID(this.book._id, this.user.username).subscribe((co:Comment)=>{
      console.log(co);
      if(co==null){
          this.commentService.addComment(this.user.username, this.book._id,this.gradeS,this.comme, new Date()).subscribe(resp=>{
            if(resp['message']=='ok'){
            alert('Komentar dodat');
            this.gradeN=undefined;
            this.comme=undefined;
            this.ngOnInit();
          }
          else{
            alert(resp['message']);
            return;
          }
        })
      }
      else{
        alert('Vec ste dodali komentar za ovu knjigu');
        return;
      }
    })
  }

  updateKomentar(){
    this.gradeS="";
    for(let i=0;i<this.gradeN;i++){
      this.gradeS = this.gradeS + '*';
    }
    this.commentService.updateComment(this.book._id, this.user.username, this.gradeS,this.comme, new Date()).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert('Komentar je azuriran');
        this.ngOnInit();
      }
      else{
        alert(resp['message']);
        return;
      }
    })
  }
}
