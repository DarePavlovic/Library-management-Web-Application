import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';

  login(user, pass){
    const data = {
      username:user,
      password:pass
    }

    return this.http.post(`${this.uri}/userDatabase/login`, data);
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

  return this.http.post(`${this.uri}/userDatabase/register`, data);
}


  getUser(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/userDatabase/getUser`,data);
  }
  getEmail(username, email){
    const data = {
      username:username,
      email:email
    }

    return this.http.post(`${this.uri}/userDatabase/getEmail`,data);
  }

  
//   baseApiUrl = "https://file.io"

//   upload(file):Observable<any> {
  
//     // Create form data
//     const formData = new FormData(); 
      
//     // Store form name as "file" with file data
//     formData.append("file", file, file.name);
//     console.log(file.name);
      
//     // Make http post request over api
//     // with formData as req
//     return this.http.post(this.baseApiUrl, formData)
// }

getPassword(username, password){
  const data = {
    username:username,
    password:password
  }

  return this.http.post(`${this.uri}/userDatabase/getPassword`,data);
}

changePassword(username, password){
  const data = {
    username:username,
    password:password
  }

  return this.http.post(`${this.uri}/userDatabase/changePassword`,data);

}

deleteUser(username){
  const data = {
    username:username
  }
  
  return this.http.post(`${this.uri}/userDatabase/delete`,data);
}

  getAllUsers(){
    return this.http.get(`${this.uri}/userDatabase/getAllUsers`);
  }

  updateProfile(first,last, userN,addr,phone,mail, pict, type){
    const data = {
      firstname:first,
      lastname:last,
      username:userN,
      address:addr,
      phone_number:phone,
      email:mail,
      picture:pict,
      type:type
    }
    return this.http.post(`${this.uri}/userDatabase/updateProfile`,data);
  }

  updateDays(days){
    const data = {
      extendNumber:days
    }
    return this.http.post(`${this.uri}/userDatabase/updateDays`,data);
  }
  
}
