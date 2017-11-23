import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { products } from './products-mock';
import { productStatsMock } from './product-stats.mock';

@Injectable()
export class ProductsService {
  private products: any[] = products;

  constructor() {
  }

  public getProducts(): Observable<any[]> {
    return new Observable((observer) => {
      observer.next(this.products);
    });
  }

  public getProduct(id): Observable<any> {
    return new Observable((observer) => {
      const product = this.products.find((product) => {
        return product.id.toString() === id;
      });

      observer.next(product || null);
    });
  }

  public saveProduct(productData, id?) {
    return new Observable((observer) => {
      if (!id) {
        productData.id = this.products.length;
        this.products.unshift(Object.assign(productData, productStatsMock));
        observer.next(productData.id);
        return;
      }

      const product = this.products.find((product) => {
        return product.id === id;
      });

      Object.assign(product, productData);
      observer.next(product.id);
    });
  }
}
