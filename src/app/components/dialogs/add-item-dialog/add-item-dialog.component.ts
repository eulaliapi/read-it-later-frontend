import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Item } from 'src/app/models/itemModel';
import { User } from 'src/app/models/userModel';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit {

  itemForm!: FormGroup;
  user: any;

  constructor(public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private userService: UserService){ }

  ngOnInit(): void {
    this.userService.getUser().subscribe( res => this.user = res);
    this.itemForm = this.fb.group({
      title: '',
      url: ''
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.itemForm.value.title != '' || this.itemForm.value.url != ''){
      this.itemsService.postItem(this.itemForm.value, this.user.user.id)
      .subscribe(item => {this.dialogRef.close({data: item})});
    }
  }

}
