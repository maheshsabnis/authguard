import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/app.orders.model';
import { OrdersService } from '../../services/app.orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editorder-component',
  templateUrl: './app.edit.order.view.html'
})
export class EditOrderComponent implements OnInit {
  order: Orders;
  status: string;
  id: number;
  constructor(private serv: OrdersService, private router: Router, private act: ActivatedRoute) {
    this.order = new Orders(0, '', '', '', 0, 0, 0, false, '', '');
    this.status = '';
    this.id = 0;
  }
  clear(): void {
   this.order = new Orders(0, '', '', '', 0, 0, 0, false, '', '');
  }

  save(): void {
     this.order.UpdatedBy = localStorage.getItem('userName');
     const roleName = localStorage.getItem('roleName');
     this.serv.putOrder(this.id, this.order).subscribe((response) => {
        this.order = response;
        this.status = 'Order Updated Successfully';

        this.router.navigate([`${roleName.toLocaleLowerCase()}/listorder`]);
     }, (error) => {
        this.status = `Error Occured ${error}`;
     });
  }
  ngOnInit(): void {
      this.act.params.subscribe((param) => {
        this.id = param.id;
        if (this.id > 0){
            this.serv.getOrderById(this.id).subscribe((response) => {
                this.order = response;
                this.status = 'Order fetched Successfully';
            }, (error) => {
              this.status = `Error Occured ${error}`;
            });
        }
      });
  }
}
