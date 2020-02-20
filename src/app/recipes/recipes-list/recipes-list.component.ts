import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  @Output() manageRecipe = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Just testing stuff', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Test Recipe 2', 'Just testing stuff', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onManageRecipe(recipeEl: Recipe){
    this.manageRecipe.emit(new Recipe(recipeEl.Name, recipeEl.Description, recipeEl.ImagePath));
  }

}
