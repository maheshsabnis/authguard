import { Component, OnInit } from '@angular/core';
import {RegisterUser, ResponseStatus} from './../../models/app.models';
import { UserManagementService } from 'src/app/services/app.usermanagement.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userregistration-component',
  templateUrl: './app.userregistration.view.html'
})
export class UserRegistrationComponent implements OnInit {
  user: RegisterUser;
  status: string;
  constructor(private router: Router, private serv: UserManagementService) {
    this.user = new RegisterUser('', '', '');
    this.status = '';
  }
  clear(): void {
    this.user = new RegisterUser('', '', '');
  }
  save(): void {
    this.serv.createUser(this.user).subscribe((resp) => {
        this.status = resp.Message;
        this.router.navigate(['login']);
    }, (error) => {
        this.status = `User Creation Failed ${error}`;
    });
  }
  ngOnInit(): void { }
}
