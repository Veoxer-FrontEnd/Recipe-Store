import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditting = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient(0, 'Apples', 5),
    new Ingredient(0, 'Tomatoes', 10)
  ];

  constructor() { }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addShoppingItem(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onUpdateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onDeleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
