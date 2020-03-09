import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipesStorageService {

    constructor(private recipesService: RecipeService, private http: HttpClient) {}

    updateOrDelete() {
        const recipes = this.recipesService.getRecipes();
        console.log(recipes.toString());
        this.http.post('http://localhost:49273/api/recipes/manage', recipes).subscribe();
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('http://localhost:49273/api/recipes/fetchall')
        .pipe(tap(recipes => {
            this.recipesService.setRecipes(recipes);
            this.recipesService.manageRecipesList.next(recipes);
        }));
    }
}
