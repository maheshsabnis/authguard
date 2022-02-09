import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/app.usermanagement.service';
import { Users, ApplicationRole, UserRole, LoginUser } from '../../models/app.models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-approveuser-component',
  templateUrl: './app.approveuser.view.html'
})
export class ApproveUserComponent implements OnInit {
  status: string;
  users: Array<Users>;
  roles: Array<ApplicationRole>;
  roleName: string;
  userName: string;
  constructor(private serv: UserManagementService) {
    this.status = '';
    this.users = new Array<Users>();
    this.roles = new Array<ApplicationRole>();
    this.roleName = '';
    this.userName = '';
  }

  ngOnInit(): void {
    const token = localStorage.getItem('roleInfo');
    alert(`In Approve User Component init ${token}`);
    const usersPromise = this.serv.getUsers(token);
    const rolesPromise = this.serv.getRoles(token);

    forkJoin([usersPromise, rolesPromise]).subscribe((responses) => {
        this.users = responses[0];
        this.roles = responses[1];
    }, (error) => {
      this.status = `Error Occured ${error}`;
    });
  }

  approveUser(): void {
      const userRole: UserRole = new UserRole(
        this.userName,
        this.roleName
      );
      const token = localStorage.getItem('roleInfo');
      alert(`In Approve User Component ${JSON.stringify(userRole)} ${token}`);
      this.serv.approveUser(userRole, token).subscribe((response) => {
         this.status = response.Message;
         alert(`In Approve User Component reponse ${JSON.stringify(response)}`);
      }, (error) => {
         this.status = `Error Occured ${error}`;
      });
  }
}
