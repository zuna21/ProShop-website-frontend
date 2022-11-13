import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../interfaces/interfaces.interface";

@Injectable({providedIn: 'root'})
export class ProductService {

  products: Product[] = [];

  constructor(private http: HttpClient) {}

  public get_products() {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/products/')
  }

  public get_product(index: string) {
    return this.http.get<Product>(`http://127.0.0.1:8000/api/products/${index}`);
  }

}
