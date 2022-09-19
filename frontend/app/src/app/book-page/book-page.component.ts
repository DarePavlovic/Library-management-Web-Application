import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BorrowBookService } from '../borrow-book.service';
import { Book } from '../models/Book';
import { BorrowBook } from '../models/BorrowBook';
import { User } from '../models/User';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private borrowBookService:BorrowBookService, private bookService:BookService) { }

  ngOnInit(): void {
    this.book=undefined;
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

  }
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
          else{
            alert(resp['message']);
          }
        })
      }
    })
    

  }
}
