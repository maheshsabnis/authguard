import { Component } from '@angular/core';
import { ResponseStatus, Roles } from './models/app.models';
import { Router } from '@angular/router';
import { UserManagementService } from './services/app.usermanagement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser: ResponseStatus;

  constructor(private router: Router,
              private userManagementService: UserManagementService) {
    this.currentUser = new ResponseStatus(0, '' , '' , ''  , '');
    // subscribe to the current user and its role
    this.userManagementService.authenticatedUser.subscribe((curUser) => {
      this.currentUser = curUser;
    });
  }

  // properties for checking the role
  get isAdministrator(): boolean {
    return this.currentUser && this.currentUser.Role === Roles.Administrator;
  }

  get isManager(): boolean {
    return this.currentUser && this.currentUser.Role === Roles.Manager;
  }

  get isClerk(): boolean {
    return this.currentUser && this.currentUser.Role === Roles.Clerk;
  }

  logout(): void  {
    this.userManagementService.logout();
    this.router.navigate(['login']);
  }
}
