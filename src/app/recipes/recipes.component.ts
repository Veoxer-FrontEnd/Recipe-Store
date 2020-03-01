import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeDetail: Recipe;
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(){
    this.recipeService.manageRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipeDetail = recipe;
      })
  }

  onAddRecipe(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  // onDisplayRecipeManager(recipe: Recipe){
  //   this.recipeDetail = recipe;
  // }
}
