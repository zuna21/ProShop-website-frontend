import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.get_products().subscribe(
      {
        next: (resp) => {
          this.isLoading = false;
          this.products = resp;
        }
      }
    )
  }

}
