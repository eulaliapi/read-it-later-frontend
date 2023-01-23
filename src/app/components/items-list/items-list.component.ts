import { Component, Input, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Item, User } from 'src/app/models/userModel';
import { ItemsService } from 'src/app/services/items.service';
import { AddItemDialogComponent } from '../dialogs/add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() items?: Item[];
  @Input() userId?: User["_id"];

  constructor(public dialog: MatDialog, private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  openDialog(){
    let dialog = this.dialog.open(AddItemDialogComponent);

    dialog.afterClosed().subscribe(res => {
      if(res != undefined) {
        if(res.data.title && res.data.url){
          console.log("mando", res.data.title, res.data.url)
          this.postItem(res.data);
        }
      }
    });
    
  }

  postItem(item: Item) {
      this.itemsService.postItem(item, this.userId).subscribe({
        next: (res) => this.items?.push(res.items[0]),
        error: (err) => console.log(err),
      })
  }

  removeItem(e: HTMLDivElement) {
    const userId = e.dataset['userid'];
    const itemId = e.id;
    this.itemsService.deleteItem(userId, itemId).subscribe({
      next: (res) => this.items = this.items?.filter(item => item._id != itemId),
      error: (err) => console.error(err)
    })
  }


}
