import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public imgPath: string;
    public state: number;
    public ingredients: Ingredient[];

    constructor(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[], state: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgPath = imagePath;
        this.ingredients = ingredients;
        this.state = state;
    }
}
