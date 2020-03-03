import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(1,
      'Pork Steak', 
    'Awesomeness in every bite !', 
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    [new Ingredient("Meat", 1),
    new Ingredient("BBQ Sauce", 2)
  ]),
    new Recipe(2,
      'Tempeh Salad', 
    'Fresh vegan food', 
    'https://cdn.pixabay.com/photo/2016/04/21/12/38/tempeh-1343291_960_720.jpg',
    [new Ingredient("Onion", 2),
    new Ingredient("Lettuce", 1),
    new Ingredient("Tomatoes", 3)
  ])];
  manageRecipe = new Subject<Recipe>();
  
  constructor(private shoppingService: ShoppingService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  onLoadRecipeDetails(id: number): Recipe{
    return this.recipes.find(x => x.Id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients);
    // ingredients.forEach(
    //   ingredientElement => {
    //     this.shoppingService.addShoppingItem(ingredientElement);
    //   } 
    // )
  }
}
