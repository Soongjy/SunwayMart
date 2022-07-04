import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { User } from '../Users';
import {MatBadgeModule} from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userdetails !: [];
  title: string = 'Sunway Mart';
  name!: string;
  privilege!:number;
  cartItemCounter :number = 0;


  constructor(private cartService: CartService,private _snackBar: MatSnackBar) {
  
   }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    for (let x in this.userdetails) {
      if (x == "name"){
        this.name = this.userdetails[x];
      }
      else if(x == "privilege"){
        this.privilege = this.userdetails[x];
      }
    }

    //to update cart item count
    this.cartService.getProducts().subscribe((items)=>{
      this.cartItemCounter = items.length;
    })

 
  }

  onLogout(){
    if(!confirm("Do you really want to Log Out?")) {
      return;
    }else{
    setTimeout(() => {
      localStorage.setItem('userdetails',JSON.stringify(null));
      window.location.href = "/";
    }, 500);
    
    }
  }

}
