import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart';
  
  cartItems: Product[] = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }

  // addToCart(product: Product){
   
  //   this.cartItems.push(product);
  //   console.log(this.cartItems)
  // }

  // getCartItems(){
  //   return of(this.cartItems);
  // }

  deleteCartItem(product: Product){
    const item = this.cartItems.find(item=> item.id === product.id);
    this.cartItems.splice(this.cartItems.indexOf(item as Product), 1);

    this.productList.next(this.cartItems);

    console.log('deleted' + product.name);
  }

  getProducts(){
    return this.productList.asObservable();
  }

  addToCart(product:any){
    this.cartItems.push(product);
    this.productList.next(this.cartItems);
  }

  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItems.map((product: Product)=>{
      grandTotal += product.price;
    })
    return grandTotal;
  }



}
