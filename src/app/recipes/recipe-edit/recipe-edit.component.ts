import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = this.id != null ? true : false;
        this.onFormInit();
      }
    );
  }

  private onFormInit(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImgPath = '';

    if(this.editMode){
      const editedRecipe = this.recipeService.onLoadRecipeDetails(this.id);
      recipeName = editedRecipe.Name;
      recipeDescription = editedRecipe.Description;
      recipeImgPath = editedRecipe.ImagePath
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(recipeDescription),
      'imgPath' : new FormControl(recipeImgPath)
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
