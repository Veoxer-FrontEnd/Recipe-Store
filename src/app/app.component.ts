import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedSection: string = 'recipes';
  title = 'Recipe Store';

  constructor(){}

  onNavigate(sectionId: string){
    this.loadedSection = sectionId;
  }
}
