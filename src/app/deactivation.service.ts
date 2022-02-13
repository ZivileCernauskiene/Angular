import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouteReuseStrategy, RouterEvent, RouterLink, RouterState, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate{
  canDeactivate:()=>Observable<boolean>|Promise<boolean>|boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeactivationService implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate, route:ActivatedRouteSnapshot, state:RouterStateSnapshot, next?:RouterStateSnapshot){
     console.log(next?.url)
     this.nextRoute=next?.url || ''
     return component.canDeactivate()
  }

  nextRoute=''
  constructor() { }
}
