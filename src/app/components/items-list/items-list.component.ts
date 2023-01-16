import { Component, Input, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/models/itemModel';
import { ItemsService } from 'src/app/services/items.service';
import { AddItemDialogComponent } from '../dialogs/add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() items?: Item[];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    let dialog = this.dialog.open(AddItemDialogComponent);

    dialog.afterClosed().subscribe(res => {
      if(res != undefined) {
        this.items?.push(res.data);
      }
    });
    
  }

  removeItem(e: Item) {
    this.items = this.items?.filter(item => item.id != e.id);
  }


}
