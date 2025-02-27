import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Auth } from '../models/auth';
import { Order } from '../models/order';
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _uriBase = 'http://localhost:1337/api';
  private _uriProducts = this._uriBase + '/products';
  private _uriLogin = this._uriBase + '/login';
  private _uriOrders = this._uriBase + '/orders';
  private _uriOrdersList = this._uriOrders + '/list';

  constructor(
    private _http: HttpClient,
    private shoppingCartService: ShoppingCartService
  ) { }

  public getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._uriProducts);
  }

  public login(user: User): Observable<Auth> {
    return this._http.post<Auth>(this._uriLogin, user);
  }

  public getAllOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this._uriOrdersList + `/${AuthService.getUserId()}`);
  }

  public getOrderProductsById(id: number): Observable<Product[]> {
    return this._http.get<Product[]>(this._uriOrders + `/${id}`);
  }

  public createOrder(): Observable<void> {
    return this._http.post<void>(this._uriOrders, {
      userId: AuthService.getUserId(),
      products: this.shoppingCartService.products()
    });
  }
}
