import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(user, pass){
    const data = {
      username:user,
      password:pass
    }

    return this.http.post(`${this.uri}/user/login`, data);
  }

  register(first,last, userN,pass, addr, phone, mail, pict){
    const data = {
      firstname:first,
      lastname:last,
      username:userN,
      password:pass,
      address:addr,
      phone_number:phone,
      email:mail,
      picture:pict
    }

    return this.http.post(`${this.uri}/user/register`, data);
  }


  getUser(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/user/getUser`,data);
  }
  getEmail(username, email){
    const data = {
      username:username,
      email:email
    }

    return this.http.post(`${this.uri}/user/getEmail`,data);
  }
}
