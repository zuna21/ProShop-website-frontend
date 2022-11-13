import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/interfaces/interfaces.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product: Product;
  products;
  isCartEmpty: boolean = true;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      {
        next: (resp) => {
          if(resp['id']) {
            this.isCartEmpty = false;
            this.productService.get_product(resp['id']).subscribe(
              {
                next: (prod) => {
                  this.product = prod;
                  this.route.queryParams.subscribe(
                    {
                      next: (resp: Params) => {
                        this.product['qty'] = parseInt(resp.qty);
                        if(localStorage.getItem('selectedProducts')) {
                          this.products = JSON.parse(localStorage.getItem('selectedProducts'));
                          this.products = [...this.products, this.product];
                          localStorage.setItem('selectedProducts', JSON.stringify(this.products));
                        } else {
                          this.products = [
                            this.product
                          ];
                          localStorage.setItem('selectedProducts', JSON.stringify(this.products));
                        }
                      }
                    }
                  )
                }
              }
            )
          } else {
            if(localStorage.getItem('selectedProducts')) {
              this.isCartEmpty = false;
              this.products = JSON.parse(localStorage.getItem('selectedProducts'));
            } else {
              this.isCartEmpty = true;
            }
          }
        }
      }
    )
  }

  getArray(num: number) {
    const niz = [];
    for(let i=1; i<=num; i++) {
      niz.push(i);
    }
    return niz;
  }

  onMatOption(storedProductId: number, storedNum: number) {
    let storedProducts = JSON.parse(localStorage['selectedProducts'])
    let storedProduct = storedProducts.find(element => {
      return element._id === storedProductId;
    })
    storedProducts = storedProducts.filter(element => {
      return element._id !== storedProductId
    });
    storedProduct['qty'] = storedNum;
    storedProducts.push(storedProduct);
    localStorage.setItem('selectedProducts', JSON.stringify(storedProducts));
  }

}
