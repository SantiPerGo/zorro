import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../../../models/product';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'product-list',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() products!: Product[];

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  protected scrollCarousel(direction: number): void {
    if (this.carousel) {
      // width + gap
      const scrollAmount = 220;
      this.carousel.nativeElement.scrollBy({ 
        left: direction * scrollAmount, 
        behavior: 'smooth' 
      });
    }
  }
}