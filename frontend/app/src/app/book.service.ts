import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';


 
  addBook(name, writer, style, publisher, year, language, picture, number){
    const data = {
      name:name,
      writer:writer,
      style:style,
      publisher:publisher,
      year:year,
      language:language,
      picture:picture,
      number:number
    }
    
    return this.http.post(`${this.uri}/books/addBook`, data);
  }

  



  getAllBooks(){
    return this.http.get(`${this.uri}/books/getAllBooks`)
  }

  updateBook(_id,name, writer, style, publisher, year, language, picture, number){
    const data = {
      _id:_id,
      name:name,
      writer:writer,
      style:style,
      publisher:publisher,
      year:year,
      language:language,
      picture:picture,
      number:number
    }

    return this.http.post(`${this.uri}/books/updateBook`, data)
  }

  deleteBook(_id){
    const data = {
      _id:_id
    }
    return this.http.post(`${this.uri}/books/deleteBook`, data)
  }


  searchBookByWriter(writer){
    return this.http.get(`${this.uri}/books/searchBookByWriter?param=${writer}`)
  }
  searchBookByName(name){
    return this.http.get(`${this.uri}/books/searchBookByName?param=${name}`)

  }

  returnBook(id, number){
    const data = {
      _id:id,
      number:number
    }

    return this.http.post(`${this.uri}/books/returnBook`, data)
  }
  takeBook(id, number, taken){
    const data = {
      _id:id,
      number:number,
      taken:taken
    }
    return this.http.post(`${this.uri}/books/takeBook`, data)
  }

  getBookByID(id){
    return this.http.get(`${this.uri}/books/getBookByID?param=${id}`)
  }

  getBorrowSortName(){
    return this.http.get(`${this.uri}/books/getBorrowSortName`)

  }
  getBorrowSortWriter(){
    return this.http.get(`${this.uri}/books/getBorrowSortWriter`)

  }
  getTopBooks(){
    return this.http.get(`${this.uri}/books/getTopBooks`)
  }
}
