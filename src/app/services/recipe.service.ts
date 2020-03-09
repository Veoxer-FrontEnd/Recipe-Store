import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // private recipes: Recipe[] = [
  //   new Recipe(0,
  //     'Pork Steak',
  //   'Awesomeness in every bite !',
  //   'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //   [new Ingredient(0, 'Meat', 1),
  //   new Ingredient(0, 'BBQ Sauce', 2)
  // ], 0),
  //   new Recipe(0,
  //     'Tempeh Salad',
  //   'Fresh vegan food',
  //   'https://cdn.pixabay.com/photo/2016/04/21/12/38/tempeh-1343291_960_720.jpg',
  //   [new Ingredient(0, 'Onion', 2),
  //   new Ingredient(0, 'Lettuce', 1),
  //   new Ingredient(0, 'Tomatoes', 3)
  // ], 0)];
  private recipes: Recipe[] = [];
  manageRecipe = new Subject<Recipe>();
  manageRecipesList = new Subject<Recipe[]>();

  constructor(private shoppingService: ShoppingService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  onLoadRecipeDetails(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
    // ingredients.forEach(
    //   ingredientElement => {
    //     this.shoppingService.addShoppingItem(ingredientElement);
    //   }
    // )
  }

  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    this.manageRecipesList.next(this.recipes.slice());

    return this.recipes.length;
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.manageRecipesList.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes[id].state = 2;
    this.manageRecipesList.next(this.recipes.slice());
    // this.recipes.splice(index, 1);
    // this.manageRecipesList.next(this.recipes.slice());
  }
}
