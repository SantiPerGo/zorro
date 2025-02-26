import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _uriBase = 'http://localhost:1337/api';
  private _uriProducts = this._uriBase + '/products';

  constructor(
    private _http: HttpClient
  ) { }

  public getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._uriProducts);
  }
}
