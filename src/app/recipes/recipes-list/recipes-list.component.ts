import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesListSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesListSubscription = this.recipeService.manageRecipesList.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  manageRecipe(recipeEl: Recipe) {
    this.recipeService.manageRecipe.next(recipeEl);
  }

  ngOnDestroy() {
    this.recipesListSubscription.unsubscribe();
  }

}
