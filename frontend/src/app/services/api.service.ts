import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _uriBase = 'http://localhost:1337/api';
  private _uriProducts = this._uriBase + '/products';
  private _uriLogin = this._uriBase + '/login';

  constructor(
    private _http: HttpClient
  ) { }

  public getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._uriProducts);
  }

  public login(user: User): Observable<Auth> {
    return this._http.post<Auth>(this._uriLogin, user);
  }
}
