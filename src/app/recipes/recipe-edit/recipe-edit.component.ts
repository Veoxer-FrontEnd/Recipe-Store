import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  get ingredientsForm() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = this.id != null && !isNaN(this.id);
        this.onFormInit();
      }
    );
  }

  private onFormInit() {
    let recipeId = 0;
    let recipeName = '';
    let recipeDescription = '';
    let recipeImgPath = '';
    let recipeState = 0;
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const editedRecipe = this.recipeService.onLoadRecipeDetails(this.id);
      recipeId = editedRecipe.id;
      recipeName = editedRecipe.name;
      recipeDescription = editedRecipe.description;
      recipeImgPath = editedRecipe.imgPath;
      recipeState = editedRecipe.id  != null && editedRecipe.id > 0 ? 1 : 0;
      if (editedRecipe.ingredients) {
        for (const ingredient of editedRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              id: new FormControl(ingredient.id),
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.pattern(/^[1-9][0-9]*$/), Validators.required]),
              state: new FormControl(ingredient.id != null && ingredient.id > 0 ? 1 : 0)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      id: new FormControl(recipeId),
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imgPath : new FormControl(recipeImgPath, Validators.required),
      state : new FormControl(recipeState, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onAddIngredients() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    }));
  }

  onDeleteIngredient(index: number) {
    if((this.recipeForm.get('ingredients') as FormArray)[index].state == 1) {
      (this.recipeForm.get('ingredients') as FormArray)[index].state = 2;
    }
    else {
      (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    }
  }

  onCancel() {
    this.router.navigate(['recipes']);
  }

  onSubmit() {
    let newId = this.id;

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      newId = this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['recipes', newId]);
    // console.log(this.recipeForm);
  }
}
