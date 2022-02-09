import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/app.orders.model';
import { OrdersService } from '../../services/app.orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createorder-component',
  templateUrl: './app.createorder.view.html'
})
export class CreateOrderComponent implements OnInit {
  order: Orders;
  status: string;
  constructor(private serv: OrdersService, private router: Router) {
    this.order = new Orders(0, '', '', '', 0, 0, 0, false, '', '');
    this.status = '';
  }
  clear(): void {
   this.order = new Orders(0, '', '', '', 0, 0, 0, false, '', '');
  }

  save(): void {
     this.order.CreatedBy = localStorage.getItem('userName');
     const roleName = localStorage.getItem('roleName');
     this.serv.postOrder(this.order).subscribe((response) => {
        this.order = response;
        this.status = 'Order Created Successfully';
        this.router.navigate([`${roleName}/listorder`]);
     }, (error) => {
        this.status = `Error Occured ${error}`;
     });
  }
  ngOnInit(): void { }
}
