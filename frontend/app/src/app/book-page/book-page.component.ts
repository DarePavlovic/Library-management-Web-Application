import { Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { User } from '../models/User';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.book=JSON.parse(localStorage.getItem('knjiga'));
    this.user = JSON.parse(localStorage.getItem('ulogovan'));
    this.writerBook=undefined;
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

  zaduzi(){
    
  }
}
