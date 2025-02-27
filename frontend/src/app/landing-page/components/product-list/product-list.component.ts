import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Product } from '../../../models/product';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'product-list',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() products!: Product[];

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {}

  protected scrollCarousel(direction: number): void {
    if (this.carousel) {
      // width + gap
      const scrollAmount = 250;
      this.carousel.nativeElement.scrollBy({ 
        left: direction * scrollAmount, 
        behavior: 'smooth' 
      });
    }
  }

  protected addToShoppingCart(product: Product) {
    this.shoppingCartService.addProduct(product);

    this._snackBar.open('¡Producto agregado al carrito!', undefined, {
      duration: 3000
    });
  }
}