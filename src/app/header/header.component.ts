import { Component } from '@angular/core';
import { RecipesStorageService } from '../services/recipes-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    // @Output() loadSection = new EventEmitter<string>();

    constructor(private recipesStorageService: RecipesStorageService) {
    }

    onSaveData() {
        this.recipesStorageService.updateOrDelete();
    }

    onFetchData() {
        this.recipesStorageService.fetchRecipes().subscribe(data => {
            console.log(data)
        }, error => {
            console.log(error);
        });
    }

    // loadRecipes(){
    //     this.loadSection.emit("recipes");
    // }

    // loadShoppingList(){
    //     this.loadSection.emit("shoppingList");
    // }
}