import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const route: Routes = [
    {path: "", redirectTo: '/recipes', pathMatch: 'full'},
    {path: "recipes", component: RecipesComponent, children: [
        {path: "", component: RecipeStartComponent },
        {path: "recipe/:id", component: RecipeDetailComponent},
        {path: "recipe/:id/edit", component: RecipeEditComponent},
        {path: "add", component: RecipeEditComponent},
    ]},
    {path: "shopping-list", component: ShoppingListComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(route)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}