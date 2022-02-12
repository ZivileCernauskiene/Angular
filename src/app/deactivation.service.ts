import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate{
  canDeactivate:()=>Observable<boolean>|Promise<boolean>|boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeactivationService implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate, route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
     console.log('servisas')
     return component.canDeactivate()
  }
  constructor() { }
}
