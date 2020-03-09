import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
    public Id: number;
    public Name: string;
    public Description: string;
    public ImgPath: string;
    public State: number;
    public Ingredients: Ingredient[];

    constructor(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[], state: number){
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.ImgPath = imagePath;
        this.Ingredients = ingredients;
        this.State = state;
    }
}