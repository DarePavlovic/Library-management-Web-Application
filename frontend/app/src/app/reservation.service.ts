import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';

  addReservation(username, bookId, ticket){
    const data = {
      book_id:bookId,
      username:username,
      ticket:ticket,
      
    }
    
    return this.http.post(`${this.uri}/reservation/addReservation`, data);
  }

  getAllReservation(){
    return this.http.get(`${this.uri}/reservation/getAllReservation`)
  }

  getReservationByBookID(book, username){
    const data = {
      id:book,
      username:username
    }
    return this.http.post(`${this.uri}/reservation/getReservationByBookID`, data);

  }

  doneReservation(book_id,username){
    const data={
      book_id:book_id,
      username:username,
      
    }
    return this.http.post(`${this.uri}/reservation/doneReservation`, data);

  }

  getTicket(){
    
    return this.http.get(`${this.uri}/reservation/getTicket`)
  }
  getNext(){
    
    return this.http.get(`${this.uri}/reservation/getNext`)
  }

  getFromUser(username){
    return this.http.get(`${this.uri}/reservation/getFromUser?param=${username}`)
  }
}
