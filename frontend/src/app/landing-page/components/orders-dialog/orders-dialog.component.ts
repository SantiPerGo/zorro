import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Order } from '../../../models/order';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../../models/product';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'orders-dialog',
  imports: [MatIconModule],
  templateUrl: './orders-dialog.component.html',
  styleUrl: './orders-dialog.component.css'
})
export class OrdersDialogComponent implements OnInit {
  protected orders: Order[] = [];

  constructor(
    private apiService: ApiService,
    protected dialogRef: MatDialogRef<OrdersDialogComponent>
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  private async loadOrders() {
    try {
      this.orders = await firstValueFrom(this.apiService.getAllOrders());

      for (const order of this.orders) {
        const products: Product[] = await firstValueFrom(this.apiService.getOrderProductsById(order.id));
        order.products = products; 
      }
    } catch(error) {
      console.error(error);
    }
  }
}
