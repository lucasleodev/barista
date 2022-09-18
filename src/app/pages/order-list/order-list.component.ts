import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../shared/components/delete-modal/delete-modal.component';
import { OrdersService } from '../shared/services/orders/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: any = [];
  displayedColumns: string[] = ['id', 'customer', 'coffe', 'actions'];
  constructor(
    private orderService: OrdersService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  async getAllOrders(): Promise<void> {
    this.orderList = new MatTableDataSource(
      (await this.orderService.getAllOrders()).sort((a, b) => a.id - b.id)
    );
  }

  async deleteOrder(order: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      result ? await this.orderService.deleteOrder(order) : undefined;
      this.getAllOrders();
    });
  }

  editOrder(order: number) {
    this.router.navigate([`/order/${order}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();
  }
}
