import { Component, effect, Injector, signal, Signal, WritableSignal } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../../models/product';
import { ApiService } from '../../../services/api.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'main-content',
  imports: [ProductListComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  protected products: WritableSignal<Product[]> = signal([]);

  constructor(
    private _apiService: ApiService,
    private shoppingCartService: ShoppingCartService,
    private _injector: Injector
  ){}

  ngOnInit() {   
    effect(() => {
      const products = this.shoppingCartService.products();
      const isCartEmpty = !products || products.length === 0;

      if(isCartEmpty)
        this._apiService.getAllProducts().subscribe({
            next: products => this.products.set([...products]),
            error: response => console.error(response)
          });
    }, {injector: this._injector});
  }
}
