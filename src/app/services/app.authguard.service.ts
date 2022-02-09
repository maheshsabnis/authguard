import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {UserManagementService} from './app.usermanagement.service';
import { OrdersService } from './app.orders.service';
@Injectable({
   providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {

  constructor(
    private router: Router,
    private userManagementService: UserManagementService
    // ,  private orderService: OrdersService
  ) {
  }
// ActivatedRouteSnapshot: Will be used to verify path (or route) in Route table 
// for access rights using the 'canActivate' property applied on it
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // get teh current login user
    const currentLoginUser = this.userManagementService.currentUserInfo;
    // if the user information is available then check for the route data
    // to verify which rout is authorization to the user
    if (currentLoginUser) {
      // route is restricted by role
      if (route.data.role && route.data.roles.indexOf(currentLoginUser.Role) === -1) {
          // navigate to unauthorized component
          this.router.navigate(['unauthorized']);
          return false;
      }
      // return true if authorize
      return true;
    }
    // redirect to the login view with the
    // return URL from router state snapshot
    this.router.navigate(['login'], {queryParams: {
        returnUrl: state.url
    }});
    return false;
  }

}
