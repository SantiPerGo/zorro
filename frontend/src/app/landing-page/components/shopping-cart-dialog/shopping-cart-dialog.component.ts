import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Product } from '../../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'shopping-cart-dialog',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrl: './shopping-cart-dialog.component.css'
})
export class ShoppingCartDialogComponent implements OnInit {
  protected products: Product[] = [];
  private _snackBar = inject(MatSnackBar);

  constructor(
    protected dialogRef: MatDialogRef<ShoppingCartDialogComponent>,
    private shoppingCartService: ShoppingCartService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.products = this.shoppingCartService.products();
  }

  protected sendCart() {
    this.apiService.createOrder().subscribe({
      next: () => {
        this.shoppingCartService.cleanCart();
        this.dialogRef.close();

        this._snackBar.open('¡Pedido realizado con éxito!', undefined, {
          duration: 3000
        });
      }, error: response => console.error(response)
    });
  }
}
