import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../shared/services/orders/orders.service';
import { Order } from '../shared/types/order.type';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orderData!: Order;
  orderForm!: FormGroup;
  constructor(
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    const par = this.activatedRoute.snapshot.paramMap.get('id');
    par
      ? await this.getOrder(parseInt(par))
      : (this.orderData = { id: null, customer: '', coffe: '' });
    this.initializeForm();
  }

  async getOrder(order: number) {
    this.orderData = await this.orderService.getOrder(order);
  }

  initializeForm() {
    this.orderForm = this.formBuilder.group({
      id: [this.orderData.id],
      customer: [this.orderData.customer, [Validators.required]],
      coffe: [this.orderData.coffe, [Validators.required]],
    });
  }

  sendOrder() {
    this.orderData.id
      ? this.orderService.updateOrder(this.orderForm.value)
      : this.orderService.createOrder(this.orderForm.value);
  }
}
