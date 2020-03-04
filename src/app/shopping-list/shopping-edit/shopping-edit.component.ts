import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('inputName', {static:false}) inputName: ElementRef;
  // @ViewChild('inputAmount', {static:false}) inputAmount: ElementRef;
  // @Output() shoppingItemAdded = new EventEmitter<Ingredient>();
  @ViewChild('f', { static: false }) shoppingForm: NgForm;
  editedIndex: number;
  editedIngredient: Ingredient;
  editMode = false;
  ingredientSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredientSubscription = this.shoppingService.startedEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editedIndex = index;
      this.editedIngredient = this.shoppingService.getIngredient(index);
      this.shoppingForm.setValue({
        inputName: this.editedIngredient.name,
        inputAmount: this.editedIngredient.amout
      });
    });
  }

  onSubmit() {
    // const ingName = this.inputName.nativeElement.value;
    // const ingAmount = this.inputAmount.nativeElement.value;
    const newIng = new Ingredient(this.shoppingForm.value.inputName, this.shoppingForm.value.inputAmount);
    if (this.editMode) {
      this.shoppingService.onUpdateIngredient(this.editedIndex, newIng);
    }
    else {
      this.shoppingService.addShoppingItem(newIng);
    }
    this.onClear();
    // this.shoppingItemAdded.emit(newIng);
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDeleteItem(){
    this.shoppingService.onDeleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.ingredientSubscription.unsubscribe();
  }
}
