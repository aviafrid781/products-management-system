import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// @ViewChild('search') search!: ElementRef;
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencyPipe,
    NgForOf,
    NgIf,
    MatPaginatorModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredData: any[] = [];
  totalPrice: number = 0;
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'total_price',
    'actions',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      this.products = JSON.parse(localStorage.getItem('products') || '[]');
      console.log(this.products);
    } else {
      console.warn(
        'localStorage is not available. Running in a non-browser environment.'
      );
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  }

  editProduct(oid: number) {
    console.log(oid);
    this.router.navigate([`/update-products-form/${oid}`]);
  }

  search(query: string): void {
    console.log(query);
    if (query) {
      this.filteredData = this.products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      if (this.filteredData) {
        this.products = this.filteredData;
      } else {
        this.onRefresh();
      }
    } else {
      this.onRefresh();
    }
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.onRefresh();
    alert('Product Deleted successfully!');
  }

  onRefresh() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  AddProduct() {
    this.router.navigate(['/create-products-form']);
  }

  goToHome() {
    this.router.navigate(['/products-list']);
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'localStorageTest';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
