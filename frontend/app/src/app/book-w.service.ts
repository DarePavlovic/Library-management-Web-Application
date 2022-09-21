import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookWService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';

  addBook(username,name, writer, style, publisher, year, language, picture, number){
    const data = {
      username:username,
      name:name,
      writer:writer,
      style:style,
      publisher:publisher,
      year:year,
      language:language,
      picture:picture,
      number:number
    }
    
    return this.http.post(`${this.uri}/booksW/addBook`, data);
  }

  getAllBooks(){
    return this.http.get(`${this.uri}/booksW/getAllBooks`)
  }

  deleteBook(_id){
    const data = {
      _id:_id
    }
    return this.http.post(`${this.uri}/booksW/deleteBook`, data)
  }

  getBookByID(id){
    return this.http.get(`${this.uri}/booksW/getBookByID?param=${id}`)
  }
}
