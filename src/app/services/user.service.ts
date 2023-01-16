import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://read-it-later.onrender.com";

  constructor(private http: HttpClient) { }

  getUser(){
    let req = this.http.get(`${this.apiUrl}/user`);
    return req;
  }
}
