import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeDetail: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(){
    this.recipeService.manageRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipeDetail = recipe;
      })
  }

  // onDisplayRecipeManager(recipe: Recipe){
  //   this.recipeDetail = recipe;
  // }
}
