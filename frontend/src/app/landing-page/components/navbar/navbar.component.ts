import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDialogComponent } from '../orders-dialog/orders-dialog.component';

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

  protected openDialog() {
    this.dialog.open(OrdersDialogComponent);
  }
}
