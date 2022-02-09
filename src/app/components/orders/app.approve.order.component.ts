import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/app.orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../../models/app.orders.model';

@Component({
  selector: 'app-approveorder-component',
  templateUrl: './app.approve.order.view.html'
})
export class ApproveOrderComponent implements OnInit {
  orderUniqueueId: number;
  order: Orders;
  status: string;
  constructor(private serv: OrdersService, private router: Router, private act: ActivatedRoute) {
    this.orderUniqueueId = 0;
    this.order = new Orders(0, '', '', '', 0, 0, 0, false, '', '');
    this.status = '';
  }
  ngOnInit(): void {
    this.act.params.subscribe((param) => {
      this.orderUniqueueId = param.id;
      if (this.orderUniqueueId > 0){
          this.serv.getOrderById(this.orderUniqueueId).subscribe((response) => {
              this.order = response;
              this.status = 'Order fetched Successfully';
          }, (error) => {
            this.status = `Error Occured ${error}`;
          });
      }
    });
  }
  cancel(): void {
    const roleName = localStorage.getItem('roleName');
    this.router.navigate([`${roleName.toLowerCase()}/listorder`]);
  }
  approveOrder(): void {
    const roleName = localStorage.getItem('roleName');
    this.serv.approveOrder(this.orderUniqueueId, this.order).subscribe((response) => {
       if (response) {
          this.status = 'Order is Approved';
          this.router.navigate([`${roleName.toLowerCase()}/listorder`]);
       }
    }, (error) => {
        alert(`The error ${error.statusText}`);
        this.status = `Order is not approved ${error}`;
    });
  }
}
