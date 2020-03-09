import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipesStorageService{

    constructor(private recipesService: RecipeService, private http: HttpClient){}

    updateOrDelete(){
        const recipes = this.recipesService.getRecipes();
        console.log(recipes.toString());
        this.http.post('https://recipesapi.veoxer.com/api/recipes/manage', recipes).subscribe();
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://recipesapi.veoxer.com/api/recipes/fetchall')
        .pipe(map(recipes => {
            this.recipesService.setRecipes(recipes);
            this.recipesService.manageRecipesList.next(recipes);
        }));
    }
}