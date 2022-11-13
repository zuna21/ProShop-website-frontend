import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/interfaces.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product = {} as Product;
  id: string;
  isLoading: boolean = true;
  selectedNumber: number = 1;;
  inStockArray: number[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      {
        next: (params: Params) => {
          this.id = params['id'];
        }
      }
    );

    this.productService.get_product(this.id).subscribe(
      {
        next: (resp) => {
          this.isLoading = false;
          this.product = resp;
          if(this.product.countInStock > 0) {
            this.inStockArray = [...Array(this.product.countInStock).keys()];
            this.inStockArray.splice(0, 1);
          }
        }
      }
    )
  }

  goBack() {
    this.location.back();
  }

  onCart() {
    this.router.navigate(['cart', this.product._id], {queryParams: {qty: this.selectedNumber}});
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
