import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  /* @Input()*/ recipe: Recipe;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.onLoadRecipeDetails(+id);

    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.onLoadRecipeDetails(+params['id']);
      }
    );
  }

  onAddToShoppinglist(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.Ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipe.Id);
    this.router.navigate(['recipes']);
  }
}
