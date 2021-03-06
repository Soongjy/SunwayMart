import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { ManageaccountComponent } from './manageaccount/manageaccount.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { AuthGuard, AdminAuthGuard, UserAuthGuard } from './services/auth-guard.service';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';


const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'home', component: HomepageComponent, canActivate:[AdminAuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'contactus', component:ContactUsComponent},
  { path: 'about-us', component:AboutUsComponent},
  { path: 'all-products', component:AllProductsComponent},
  { path: 'admin', loadChildren: adminModule, canActivate:[AuthGuard] },
  { path: 'adminlogin', component:AdminLoginComponent},
  { path: 'category/:params', component:CategoryComponent},
  { path: 'viewcart', component:CartComponent, canActivate:[UserAuthGuard]},
  { path: 'manageaccount', component:ManageaccountComponent, canActivate:[UserAuthGuard]},
  { path: 'changepassword', component:ChangepasswordComponent, canActivate:[UserAuthGuard]},
  { path: 'search/:searchTerm', component:AllProductsComponent},
  { path: 'orderconfirmation', component:OrderconfirmationComponent, canActivate:[UserAuthGuard]},
  { path: 'orderhistory', component:OrderHistoryComponent, canActivate:[UserAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
