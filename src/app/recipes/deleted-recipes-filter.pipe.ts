import { PipeTransform, Pipe } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { RecipesStorageService } from '../services/recipes-storage.service';

@Pipe({
    name: 'deletedrecipesfilter'
})
export class DeletedRecipesFilter implements PipeTransform {
    transform(value: any) {
        if (value.length < 1) {
            return value;
        }

        const recipes: Recipe[] = [];
        for (const recipe of value) {
            if (recipe.state !== 2) {
                recipes.push(recipe);
            }
        }

        return recipes;
    }
}
