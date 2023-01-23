import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { User } from 'src/app/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl : string = "https://read-it-later.onrender.com";

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(){
    if(AuthInterceptor.accessToken != "") {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

  signUp(form: FormGroup["value"]) : Observable<Object>{
    let user : User = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    let req = this.http.post<Object>(`${this.apiUrl}/register`, user, {withCredentials: true});

    return req;
  }

  login(form: FormGroup["value"]): Observable<any>{

    let user: User = {
      email: form.email,
      password: form.password
    }

    let data = this.http.post<any>(`${this.apiUrl}/auth`, user, {withCredentials: true});
    return data;
  }

  logout(): Observable<any>{
    let req = this.http.get<any>(`${this.apiUrl}/logout`, {withCredentials: true})
    return req;
  }
}
