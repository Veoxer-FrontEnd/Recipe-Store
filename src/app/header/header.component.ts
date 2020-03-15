import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipesStorageService } from '../services/recipes-storage.service';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit, OnDestroy {
    isAuthenticated = false;
    authSubscription: Subscription;
    username = '';
    // @Output() loadSection = new EventEmitter<string>();

    constructor(private recipesStorageService: RecipesStorageService, private authService: AuthService, private route: Router) {
    }

    ngOnInit(): void {
      this.authSubscription = this.authService.authenticatedUser.subscribe(user => {
          this.isAuthenticated = !!user;
          this.username = user?.userName;
      });
    }

    ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
    }

  onSaveData() {
        this.recipesStorageService.updateOrDelete();
    }

    onFetchData() {
        this.recipesStorageService.fetchRecipes().subscribe(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

  onLogout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

    // loadRecipes(){
    //     this.loadSection.emit("recipes");
    // }

    // loadShoppingList(){
    //     this.loadSection.emit("shoppingList");
    // }
}
