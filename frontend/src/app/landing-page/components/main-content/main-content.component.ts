import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../../models/product';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'main-content',
  imports: [ProductListComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  protected products: Product[] = [];

  constructor(
    private _apiService: ApiService
  ){}

  ngOnInit() {
    this._apiService.getAllProducts()
      .subscribe({
        next: products => this.products = products,
        error: response => console.error(response)
      });
  }
}
