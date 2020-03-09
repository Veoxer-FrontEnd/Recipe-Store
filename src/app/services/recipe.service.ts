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
  ], 0),
    new Recipe(2,
      'Tempeh Salad', 
    'Fresh vegan food', 
    'https://cdn.pixabay.com/photo/2016/04/21/12/38/tempeh-1343291_960_720.jpg',
    [new Ingredient("Onion", 2),
    new Ingredient("Lettuce", 1),
    new Ingredient("Tomatoes", 3)
  ], 0)];
  manageRecipe = new Subject<Recipe>();
  manageRecipesList = new Subject<Recipe[]>();
  
  constructor(private shoppingService: ShoppingService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
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

  addRecipe(recipe: Recipe): number{
    recipe.Id = this.recipes.length + 1;
    this.recipes.push(recipe);
    this.manageRecipesList.next(this.recipes.slice());

    return recipe.Id;
  }

  updateRecipe(id:number, recipe: Recipe){
    const index = this.recipes.findIndex(recip => recip.Id === id);
    recipe.Id = id;

    if(index > -1){
      this.recipes[index] = recipe;
    }

    this.manageRecipesList.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes.find(recip => recip.Id === id).State = 2;
    // this.recipes.splice(index, 1);
    // this.manageRecipesList.next(this.recipes.slice());
  }
}
