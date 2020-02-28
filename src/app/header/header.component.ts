import { Component } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent{

    // @Output() loadSection = new EventEmitter<string>();

    constructor() {
    }

    // loadRecipes(){
    //     this.loadSection.emit("recipes");
    // }

    // loadShoppingList(){
    //     this.loadSection.emit("shoppingList");
    // }
}