import { Component, OnInit } from '@angular/core';
import {ApplicationRole} from './../../models/app.models';
import { UserManagementService } from '../../services/app.usermanagement.service';
@Component({
  selector: 'app-rolecreation-component',
  templateUrl: './app.rolecreation.view.html'
})
export class RoleCreationComponent implements OnInit {
  role: ApplicationRole;
  status: string;
  constructor(private serv: UserManagementService) {
    this.role = new ApplicationRole('', '');
    this.status = '';
  }
  clear(): void {
    this.role = new ApplicationRole('', '');
  }
  save(): void {
     const normalizedName: string = this.role.Name.toUpperCase();
     this.role.NormalizedName = normalizedName;
     const token: string = localStorage.getItem('roleInfo');
     this.serv.createRole(this.role, token).subscribe((resp) => {
        this.status = resp.Message;
     }, (error) => {
      this.status = `Error Occured ${error}`;
     });
  }
  ngOnInit(): void { }
}
