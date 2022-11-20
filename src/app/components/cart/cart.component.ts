import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/interfaces.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public isEmpty: boolean;
  public products: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['qty']) {
      const amount = this.route.snapshot.queryParams['qty'];
      const prodId = this.route.snapshot.params['id'];

      this.productService.get_product(prodId).subscribe(
        {
          next: (resp) => {
            let product = resp;
            product['qty'] = amount;
            if(localStorage.getItem('selectedProducts')) {
              let localProducts = JSON.parse(localStorage.getItem('selectedProducts'));
              localProducts.push(product);
              localStorage.setItem('selectedProducts', JSON.stringify(localProducts));
            } else {
              let localProducts = [];
              localProducts.push(product);
              localStorage.setItem('selectedProducts', JSON.stringify(localProducts));
            }

            this.router.navigate(['/cart']);
          }
        }
      )
    } else {

      // Kad udjes direktno u /card
      this.products = JSON.parse(localStorage.getItem('selectedProducts'));

      if(this.products) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }

    }
  }



  getQTY(amount: number) {
    let returnedArray = [];
    for(let i=1; i<=amount; i++) {
      returnedArray.push(i);
    }

    return returnedArray;
  }

  onChangeProductQTY(index: number, amount: number) {
    let newProduct = this.products.find((prod) => {
      return parseInt(prod._id) === index;
    });
    newProduct['qty'] = amount;
    let newProducts = this.products.filter((prod) => {
      return parseInt(prod._id) !== index;
    });

    newProducts.push(newProduct);
    localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
  }

  subtotal() {
    return this.products.length;
  }

  refresh(): void {
    window.location.reload();
}

  onDelete(index: number) {
    const newProducts = this.products.filter((prod) => {
      return parseInt(prod._id) !== index
    });

    localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
    this.refresh();
  }

}
