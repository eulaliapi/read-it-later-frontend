import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/itemModel';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Output() removeItemFromView = new EventEmitter<Item>();
  @Input() itemContent?: Item;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    
  }

  onDeleteCard(card: HTMLDivElement){
    let itemId = Number(card.id);
    this.itemsService.deleteItem(itemId).subscribe(res => this.removeItemFromView.emit(res));
  }

}
