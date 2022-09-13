import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
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

//  first,last, userN,pass, addr, phone, mail, pict
  register(  first,last, userN,pass, addr, phone, mail, pict
    ){
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

  
  baseApiUrl = "https://file.io"

  upload(file):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    console.log(file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData)
}

getPassword(username, password){
  const data = {
    username:username,
    password:password
  }

  return this.http.post(`${this.uri}/user/getPassword`,data);
}

changePassword(username, password){
  const data = {
    username:username,
    password:password
  }

  return this.http.post(`${this.uri}/user/changePassword`,data);

}

deleteUser(username){
  const data = {
    username:username
  }
  
  return this.http.post(`${this.uri}/user/deleteUser`,data);
}

  getAllUsers(){
    return this.http.get(`${this.uri}/user/getAllUsers`);
  }

  
  
}