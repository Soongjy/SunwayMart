import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';
import { Category } from '../Category';
import { CompanyService } from '../services/company.service';
import { Product } from '../Product';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userdetails!: [];
  admindetails!: [];
  title: string = 'Sunway Mart';
  name!: string;
  privilege!: number;
  cartItemCounter: number = 0;
  categories: Category[] = [];

  mobile!: boolean;

  companyLogo!: string;
  status!: string;

  cartData: Product[] = [];

  test!: number;

  constructor(
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.userdetails = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.admindetails = JSON.parse(sessionStorage.getItem('admindetails')!);
    if (sessionStorage.getItem('isAdmin') == 'true') {
      this.status = 'admin';
    } else if (sessionStorage.getItem('isUser') == 'true') {
      this.status = 'user';
    }
    if (!this.admindetails) {
      for (let x in this.userdetails) {
        if (x == 'name') {
          this.name = this.userdetails[x];
        }
      }
    } else {
      for (let x in this.admindetails) {
        if (x == 'name') {
          this.name = this.admindetails[x];
        }
      }
    }

    this.getCartItems();
    this.cartData = JSON.parse(localStorage.getItem('cartData') || '[]');
    this.getCategories();

    //get logo
    this.companyService.getCompanyInfo(1).subscribe((company) => {
      this.companyLogo = company.companyLogo;
    });
  }

  onLogout() {
    if (sessionStorage.getItem('isUser') == 'true') {
      if (!confirm('Do you really want to Log Out?')) {
        return;
      } else {
        setTimeout(() => {
          localStorage.setItem('userdetails', JSON.stringify(null));
          localStorage.setItem('admindetails', JSON.stringify(null));
          window.localStorage.removeItem('cartData');
          sessionStorage.clear();
          window.location.href = '/';
        }, 500);
      }
    }
    if (sessionStorage.getItem('isAdmin') == 'true') {
      if (!confirm('Do you really want to Log Out?')) {
        return;
      } else {
        setTimeout(() => {
          localStorage.setItem('admindetails', JSON.stringify(null));
          window.localStorage.removeItem('cartData');
          sessionStorage.clear();
          window.location.href = '/adminlogin';
        }, 500);
      }
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].visibility == true)
          this.categories.push(categories[i]);
      }
    });
  }

  getCartItems() {
    this.cartService.getProducts().subscribe((items) => {
      this.cartData = items;
      this.cartItemCounter = this.cartService.getCount();
    });
  }
}
