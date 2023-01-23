import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item, User } from 'src/app/models/userModel';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Output() removeItemFromView = new EventEmitter<HTMLDivElement>();
  @Input() itemContent?: Item;
  @Input() userId?: User["_id"];

  constructor() { }

  ngOnInit(): void {
    
  }

  onDeleteCard(card: HTMLDivElement){
    this.removeItemFromView.emit(card);
  }

}
