import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/app.orders.model';
@Injectable({
   providedIn: 'root'
})
export class OrdersService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5000';
  }
  getOrders(): Observable<Orders[]> {
      let response: Observable<Orders[]> = null;
      const token = localStorage.getItem('roleInfo');
      response = this.http.get<Orders[]>(`${this.url}/api/Orders/orders`, {
        headers: new HttpHeaders({
          AUTHORIZATION: `Bearer ${token}`
        })
      });
      return response;
  }
  getOrderById(id: number): Observable<Orders> {
    let response: Observable<Orders> = null;
    const token = localStorage.getItem('roleInfo');
    response = this.http.get<Orders>(`${this.url}/api/Orders/orders/${id}`, {
      headers: new HttpHeaders({
        AUTHORIZATION: `Bearer ${token}`
      })
    });
    return response;
  }
  postOrder(ord: Orders): Observable<Orders> {
    let response: Observable<Orders> = null;
    const token = localStorage.getItem('roleInfo');
    alert(`In the post order ${token} Order ${JSON.stringify(ord)}`);
    response = this.http.post<Orders>(`${this.url}/api/Orders/saveorder`, ord, {
      headers: new HttpHeaders({
        AUTHORIZATION: `Bearer ${token}`
      })
    });
    return response;
  }
  putOrder(id: number, ord: Orders): Observable<Orders> {
    let response: Observable<Orders> = null;
    const token = localStorage.getItem('roleInfo');
    alert(`In the post order ${token}`);
    response = this.http.put<Orders>(`${this.url}/api/Orders/updateorder/${id}`, ord, {
      headers: new HttpHeaders({
        AUTHORIZATION: `Bearer ${token}`
      })
    });
    return response;
  }

  deleteOrder(id: number): Observable<Orders> {
    let response: Observable<Orders> = null;
    const token = localStorage.getItem('roleInfo');
    response = this.http.delete<Orders>(`${this.url}/api/Orders/deleteorder/${id}`, {
      headers: new HttpHeaders({
        AUTHORIZATION: `Bearer ${token}`
      })
    });
    return response;
  }

  approveOrder(id: number , ord: Orders): Observable<boolean> {
    let response: Observable<boolean> = null;
    const token = localStorage.getItem('roleInfo');
    response = this.http.put<boolean>(`${this.url}/api/Orders/approveorder/${id}`, ord, {
      headers: new HttpHeaders({
        AUTHORIZATION: `Bearer ${token}`
      })
    });
    return response;
  }
}
