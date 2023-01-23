import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Item } from 'src/app/models/userModel';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit {

  itemForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private fb: FormBuilder){ }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: '',
      url: ''
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.itemForm.value.title && this.itemForm.value.url){
      this.dialogRef.close({data: this.itemForm.value});
    }
  }

}
