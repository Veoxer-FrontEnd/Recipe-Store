import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // loadedSection: string = 'recipes';
  title = 'Recipe Store';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    debugger;
    this.authService.autoLogin();
  }

  // onNavigate(sectionId: string){
  //   this.loadedSection = sectionId;
  // }
}
