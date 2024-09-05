import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css',
})
export class CreateProductFormComponent implements OnInit {
  productForm!: FormGroup;
  categories = [
    { oid: 'Electronics', name: 'Electronics' },
    { oid: 'Apparel', name: 'Apparel' },
    { oid: 'Beauty Products', name: 'Beauty Products' },
    { oid: 'Home Decor', name: 'Home Decor' },
  ];
  products = [];
  product: any;
  data: any;
  oid: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      createDate: ['', Validators.required],
    });
    this.oid = this.activatedRoute.snapshot.paramMap.get('oid') as string;
    this.FormPatchValue(this.oid);
  }

  FormPatchValue(oid: string) {
    if (typeof window !== 'undefined') {
      this.products = JSON.parse(localStorage.getItem('products') || '[]');
      this.product = this.products.find(
        (item: any) => item.oid == parseInt(oid, 10)
      );
      if (this.product) {
        this.productForm.patchValue(this.product);
      }
    }
  }

  addProduct() {
    if (this.productForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const categoryCount = products.filter(
      (product: any) => product.category === this.productForm.value.category
    ).length;

    if (categoryCount >= 10) {
      alert('Cannot add more than 10 products of the same category.');
      return;
    }
    const totalPrice =
      this.productForm.value.quantity * this.productForm.value.price;
    const payload = {
      ...this.productForm.value,
      total_price: totalPrice,
      oid: products.length
        ? Math.max(...products.map((p: any) => p.oid)) + 1
        : 1,
    };

    products.push(payload);
    localStorage.setItem('products', JSON.stringify(products));
    this.router.navigate(['/products-list']);
    alert('Product Create successfully!');
  }

  onUpdateProduct() {
    if (typeof window !== 'undefined') {
      const updatedProduct = this.productForm.getRawValue();
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const productIndex = products.findIndex(
        (product: any) => product.oid == this.oid
      );
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...updatedProduct,
        };
        localStorage.setItem('products', JSON.stringify(products));
        this.router.navigate(['/products-list']);
        alert('Product updated successfully!');
      } else {
        console.warn('Product not found.');
      }
    }
  }
}
