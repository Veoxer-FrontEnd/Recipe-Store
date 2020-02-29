import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const route: Routes = [
    {path: "https://veoxer.com", redirectTo: 'https://veoxer.com/recipes', pathMatch: 'full'},
    {path: "https://veoxer.com/recipes", component: RecipesComponent, children: [
        {path: "", component: RecipeStartComponent },
        {path: "recipe/:id", component: RecipeDetailComponent},
        {path: "recipe/:id/edit", component: RecipeEditComponent},
        {path: "add", component: RecipeEditComponent},
    ]},
    {path: "https://veoxer.com/shopping-list", component: ShoppingListComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(route)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}