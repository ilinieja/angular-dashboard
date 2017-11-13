import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import merge from 'merge';

import { ProductsService } from '../../core/products.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  private routeParamsSub: Subscription;

  public product: any;

  private defaultChartsData = {
    purchasesBySource: {
      data: {
        x: 'x',
      },
      axis: {
        x: {
          type: 'category',
        },
      },
    },
  };
  public chartsData: any = {};

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe((params) => {
      this.productsService.getProduct(params.id).subscribe((product) => {
        this.product = product;


        const productChartsData = {
          purchasesBySource: this.transformPurchasesBySourceData(product.monthlyPurchasesBySource),
        };

        Object.keys(this.defaultChartsData).forEach((key) => {
          this.chartsData[key] = merge.recursive(
            true,
            this.defaultChartsData[key],
            productChartsData[key],
          );
        });
      });
    });
  }

  private transformPurchasesBySourceData(initialData) {
    const transformedData = {
      data: {
        columns: [],
      },
    };

    transformedData.data.columns[0] = [
      'x',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    Object.keys(initialData).forEach((key) => {
      const column = [];

      column[0] = initialData[key].label;
      column.push(...initialData[key].data);

      transformedData.data.columns.push(column);
    });

    return transformedData;
  }
}
