import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputAmount') inputAmount: ElementRef;
  @Output() shoppingItemAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }
  
  onAddShoppingItem(){
    const ingName = this.inputName.nativeElement.value;
    const ingAmount = this.inputAmount.nativeElement.value;
    const newIng = new Ingredient(ingName, ingAmount);
    
    this.shoppingItemAdded.emit(newIng);
  }
}
