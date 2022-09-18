import { Injectable } from '@angular/core';
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  docData,
  setDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  Firestore,
} from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Order } from '../../types/order.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  db = getFirestore();
  mockedData = [
    {
      id: 1,
      coffe: 'Cappucino',
      customer: 'Lucas Xavier',
    },
    {
      id: 2,
      coffe: 'Latte',
      customer: 'Lucas Garcia',
    },
    {
      id: 3,
      coffe: 'Chocolate Quente',
      customer: 'Lucas Nazzy',
    },
    {
      id: 4,
      coffe: 'Mate',
      customer: 'Letty',
    },
    {
      id: 5,
      coffe: 'Frappucino',
      customer: 'Mônica',
    },
    {
      id: 6,
      coffe: 'Café com Leite',
      customer: 'Márcio',
    },
    {
      id: 7,
      coffe: 'Mocca',
      customer: 'Diego',
    },
    {
      id: 8,
      coffe: 'Café au Latte',
      customer: 'Deividy',
    },
  ];
  constructor(
    private firestore: Firestore,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  async getAllOrders() {
    const querySnapshot = await getDocs(collection(this.db, 'coffeOrder'));
    let objectToReturn = querySnapshot.docs.map((doc) => doc.data());
    return objectToReturn;
  }

  async getOrder(order: number) {
    let idOrder: string = '';
    const q = await query(
      collection(this.db, 'coffeOrder'),
      where('id', '==', +order)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      idOrder = doc.id;
    });

    let objectToReturn = querySnapshot.docs.map((doc) => doc.data());
    return objectToReturn[0] as Order;
  }

  async createOrder(order: Order) {
    if (order.id == null) {
      const allOrders = await this.getAllOrders();
      const lastOrder =
        allOrders.length > 0
          ? allOrders.reduce((prev, current) =>
              prev.id > current.id ? prev : current
            )
          : { id: null };
      console.log(lastOrder);
      order.id = lastOrder.id ? lastOrder.id + 1 : 1;
    }
    try {
      const docRef = await addDoc(collection(this.db, 'coffeOrder'), order);
      this._snackBar.open('Pedido criado com sucesso ☕', undefined, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
      this.router.navigate(['/order-list']);
    } catch (e) {
      console.error('Erro=>', e);
    }
  }

  async deleteOrder(order: number) {
    let idOrder: string = '';
    const q = await query(
      collection(this.db, 'coffeOrder'),
      where('id', '==', order)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      idOrder = doc.id;
    });

    await deleteDoc(doc(this.db, 'coffeOrder', idOrder));
    this._snackBar.open('Pedido deletado com sucesso ❌', undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  async updateOrder(order: Order) {
    let idOrder: string = '';
    const q = await query(
      collection(this.db, 'coffeOrder'),
      where('id', '==', order.id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      idOrder = doc.id;
    });

    await updateDoc(doc(this.db, 'coffeOrder', idOrder), order);
    this._snackBar.open('Pedido alterado com sucesso ☕', undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
    this.router.navigate(['/order-list']);
  }

  async populateFirestore() {
    try {
      this.mockedData.forEach(async (order) => {
        let docRef = await addDoc(collection(this.db, 'coffeOrder'), order);
      });
    } catch (e) {
      console.error('Erro=>', e);
    }
  }
}
