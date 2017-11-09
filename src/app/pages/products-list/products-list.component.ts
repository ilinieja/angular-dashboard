import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../core/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  public items: any[] = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.items = products;
    });
  }
}
