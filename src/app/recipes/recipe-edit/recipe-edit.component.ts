import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  get ingredientsForm(){
    return (<FormArray>this.recipeForm.get('Ingredients')).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = this.id != null && !isNaN(this.id)  ? true : false;
        this.onFormInit();
      }
    );
  }

  private onFormInit(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImgPath = '';
    let recipeState = 0;
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const editedRecipe = this.recipeService.onLoadRecipeDetails(this.id);
      recipeName = editedRecipe.Name;
      recipeDescription = editedRecipe.Description;
      recipeImgPath = editedRecipe.ImgPath;
      recipeState = editedRecipe.Id  != null ? 1 : 0;
      if(editedRecipe['Ingredients']){
        for(let ingredient of editedRecipe.Ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9][0-9]*$/), Validators.required])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'Name': new FormControl(recipeName, Validators.required),
      'Description': new FormControl(recipeDescription, Validators.required),
      'ImgPath' : new FormControl(recipeImgPath, Validators.required),
      'State' : new FormControl(recipeState, Validators.required),
      'Ingredients': recipeIngredients
    });
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get("Ingredients")).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    }));
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('Ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['recipes']);
  }

  onSubmit() {
    let newId = this.id;

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      newId = this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.router.navigate(['recipes', newId]);
    // console.log(this.recipeForm);
  }
}
