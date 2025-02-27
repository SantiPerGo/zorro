import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDialogComponent } from '../orders-dialog/orders-dialog.component';
import { ShoppingCartDialogComponent } from '../shopping-cart-dialog/shopping-cart-dialog.component';

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);

  constructor(private authService: AuthService) { }

  protected closeSession() {
    this.authService.closeSession();
  }

  protected openShopDialog() {
    this.dialog.open(ShoppingCartDialogComponent, {
      minWidth: '70vw'
    });
  }

  protected openOrderDialog() {
    this.dialog.open(OrdersDialogComponent, {
      minWidth: '70vw'
    });
  }
}
