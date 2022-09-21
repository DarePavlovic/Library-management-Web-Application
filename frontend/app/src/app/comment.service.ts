import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';


  addComment(username, bookId, grade, commentS,posted){
    const data = {
      book_id:bookId,
      username:username,
      grade:grade,
      commentS:commentS,
      posted:posted
    }
    
    return this.http.post(`${this.uri}/comments/addComment`, data);
  }

  getAllCommentsByBookID(book){
    return this.http.get(`${this.uri}/comments/getAllCommentsByBookID?param=${book}`)
  }

  getCommentByBookID(book, username){
    const data = {
      book_id:book,
      user:username
    }
    return this.http.post(`${this.uri}/comments/getCommentByBookID`, data);

  }

  updateComment(book_id,username,grade,comm,posted){
    const data={
      book_id:book_id,
      username:username,
      grade:grade,
      commentS:comm,
      posted:posted
    }
    return this.http.post(`${this.uri}/comments/updateComment`, data);

  }
}
