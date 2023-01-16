import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../models/itemModel';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  apiUrl : string = "https://read-it-later.onrender.com";

  constructor(private http: HttpClient) { }

  postItem(item: FormGroup["value"], id: number) {

    let newItem: Item = {
      user_id: id,
      title: item.title,
      url: item.url
    }

    let req = this.http.post<Item>(`${this.apiUrl}/items/${id}`, newItem)
    return req;
  }

  deleteItem(itemId: number): Observable<any> {

    let req = this.http.delete<Item>(`${this.apiUrl}/items/${itemId}`);
    return req;
  }

}
