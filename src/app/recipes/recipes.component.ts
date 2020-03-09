import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  recipeDetail: Recipe;
  manageRecipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.manageRecipeSubscription = this.recipeService.manageRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipeDetail = recipe;
      });
  }

  onAddRecipe() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  // onDisplayRecipeManager(recipe: Recipe){
  //   this.recipeDetail = recipe;
  // }

  ngOnDestroy() {
    this.manageRecipeSubscription.unsubscribe();
  }
}
