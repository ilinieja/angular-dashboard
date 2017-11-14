import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { AppRoutesModule } from './app.routes';
import { AuthModule } from './auth/auth.module';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
} from '@angular/material';

import { ProductsService } from './core/products.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { DonutChartComponent } from './shared/donut-chart/donut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProductsListComponent,
    ProductViewComponent,
    ProductEditComponent,
    LineChartComponent,
    DonutChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,

    AuthModule,
    AppRoutesModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
