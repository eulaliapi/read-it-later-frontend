import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { Observable } from 'rxjs';
import { User } from '../models/userModel';
;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl : string = "https://read-it-later.onrender.com";

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    let req = this.http.get<User>(`${this.apiUrl}/user`);
    return req;
  }
}
