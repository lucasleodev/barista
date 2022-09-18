import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { OrdersService } from '../shared/services/orders/orders.service';
import { User } from '../shared/types/user.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User;

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  showOrders() {
    this.router.navigate(['/order-list']);
  }

  newOrder() {
    this.router.navigate(['/order']);
  }

  logout() {
    this.authService.signOut();
  }

  populateFirestore() {
    this.orderService.populateFirestore();
  }

  async getUserData() {
    this.user = await this.authService.getUser();
  }
}
