import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeDetailsGuard implements CanActivateChild {

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return route.params.id != null;
  }
}
