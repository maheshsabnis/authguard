import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResponseStatus } from '../../models/app.models';
import { UserManagementService } from '../../services/app.usermanagement.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './app.home.view.html'
})
export class HomeComponent implements OnInit {
  currentUser: ResponseStatus;
  constructor(private serv: UserManagementService, private router: Router) {
      this.currentUser = new ResponseStatus(0, '', '', '', '');
      this.currentUser = this.serv.currentUserInfo;
  }

  ngOnInit(): void {
    alert('home');
    this.router.navigate(['listorder']);
  }
}
