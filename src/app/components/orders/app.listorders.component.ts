import { ResponseStatus, Roles } from './../../models/app.models';
import { UserManagementService } from './../../services/app.usermanagement.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/app.orders.model';
import { OrdersService } from '../../services/app.orders.service';

@Component({
  selector: 'app-listorders-component',
  templateUrl: './app.listorders.view.html'
})
export class ListOrdersComponent implements OnInit {
  orders: Array<Orders>;
  headers: Array<string>;
  status: string;
  order: Orders;
  currentUser: ResponseStatus;
  constructor(private serv: OrdersService, private router: Router, private userManagementService: UserManagementService) {
    this.orders = new Array<Orders>();
    this.headers = new Array<string>();
    this.status = '';
    this.order = new Orders(0, '', '', '', 0, 0, 0, false, '', '');
    // subscribe to the current user and its role
    this.userManagementService.authenticatedUser.subscribe((curUser) => {
      this.currentUser = curUser;
    });
  }

  ngOnInit(): void {
    for (const p of Object.keys(this.order)) {
      this.headers.push(p);
    }
    this.loadOrders();
  }

  private loadOrders(): void {
     this.serv.getOrders().subscribe((response) => {
         this.orders = response;
         console.log(`${JSON.stringify(this.orders)}`);
     }, (error) => {
        this.status = `Error occured ${error}`;
     });
  }

  get isAdministrator(): boolean {
    return this.currentUser && this.currentUser.Role === Roles.Administrator;
  }

  edit(id: number): void {
    const roleName = localStorage.getItem('roleName');
    const url = `${roleName.toLocaleLowerCase()}/editorder`;
    alert(`Edit with order no ${id} roleName ${roleName} url = ${url}`);
    this.router.navigate([url, id]);
  }
  approveOrder(id: number): void {
    const roleName = localStorage.getItem('roleName');
    const url = `${roleName.toLocaleLowerCase()}/approveorder`;
    alert(`Approve Order ${url}`);
    this.router.navigate([url, id]);
  }
}
