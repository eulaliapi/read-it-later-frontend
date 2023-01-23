import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item, User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  apiUrl : string = "https://read-it-later.onrender.com";

  constructor(private http: HttpClient) { }

  postItem(item: Item, id: User["_id"]) {

    let newItem: Item = {
      title: item.title,
      url: item.url
    }

    let req = this.http.post<any>(`${this.apiUrl}/user/${id}`, newItem)
    return req;
  }

  deleteItem(userId: User["_id"], itemId: Item["_id"]): Observable<any> {

    let req = this.http.delete<Item>(`${this.apiUrl}/user/${userId}/${itemId}`);
    return req;
  }

}
