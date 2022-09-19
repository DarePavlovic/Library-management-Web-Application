import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BorrowBookService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';

  addBorrowBook(username, bookId, startDate, endDate){
    const data = {
      username:username,
      bookId:bookId,
      startDate:startDate,
      endDate:endDate
    }
    
    return this.http.post(`${this.uri}/borrowBook/addBorrowBook`, data);
  }

  getAllBorrowedBooks(username){
    return this.http.get(`${this.uri}/borrowBook/getAllBorrowedBooks?param=${username}`)
  }
  getAllBorrowBooks(username){
    return this.http.get(`${this.uri}/borrowBook/getAllBorrowBooks?param=${username}`)
  }
  getBorrowSortWriter(username){
    return this.http.get(`${this.uri}/borrowBook/getBorrowSortWriter?param=${username}`)
  }
  getBorrowSortStart(username){
    return this.http.get(`${this.uri}/borrowBook/getBorrowSortStart?param=${username}`)
  }
  getBorrowSortName(username){
    return this.http.get(`${this.uri}/borrowBook/getBorrowSortName?param=${username}`)
  }




  updateBorrowBook(username, bookId, startDate, endDate){
    const data = {
      username:username,
      bookId:bookId,
      startDate:startDate,
      endDate:endDate
    }
    
    return this.http.post(`${this.uri}/borrowBook/updateBorrowBook`, data);
  }

  returnBorrowBook(username, bookId){
    const data = {
      username:username,
      bookId:bookId
    }
    
    return this.http.post(`${this.uri}/borrowBook/returnBorrowBook`, data);
  }
}
