import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../core/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  private routeParamsSub: Subscription;
  private product: any;

  public productForm: FormGroup;
  public productImageUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe((params) => {
      this.productsService.getProduct(params.id).subscribe((product) => {
        this.product = product;

        this.productImageUrl = product && product.imageUrl;
        if (!this.productImageUrl) {
          this.changeImage();
        }

        this.initForm();
      });
    });
  }

  public initForm() {
    this.productForm = this.formBuilder.group({
      name: [(this.product && this.product.name) || null, [Validators.required]],
      description: [(this.product && this.product.description) || null, [Validators.nullValidator]],
      price: [(this.product && this.product.price) || null, [Validators.required]],
      stock: [(this.product && this.product.stock) || null, [Validators.nullValidator]],
    });
  }

  public saveProduct(event) {
    event.preventDefault();

    const formData = this.productForm.value;
    if (this.product) {
      Object.assign(this.product, formData);
    } else {
      this.product = formData;
    }

    this.product.imageUrl = this.productImageUrl;

    this.productsService
      .saveProduct(this.product, this.product.id)
      .subscribe((productId) => {
        this.router.navigate(['', 'products']);
      });
  }

  public changeImage() {
    // hardest hardcode ever, demo purposes only
    const imagesNumber = 5;
    let currentImageIndex;
    let nextImageIndex = 1;

    if (this.productImageUrl) {
      currentImageIndex =
        parseInt(this.productImageUrl.split('/').pop().split('.').shift(), 10);
    }

    if (currentImageIndex + 1 <= imagesNumber) {
      nextImageIndex = currentImageIndex + 1;
    }

    this.productImageUrl = `assets/${nextImageIndex}.jpg`;
  }
}
