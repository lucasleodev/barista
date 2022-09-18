import { Injectable } from '@angular/core';
import { User } from '../../types/user.type';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
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
  getFirestore,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  db = getFirestore();

  constructor(
    private fireAuth: Auth,
    private firestore: Firestore,
    private fileUpload: FileUploadService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  signUp(userData: any) {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.registerUserAtFirestore(userData, user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signIn(user: any) {
    signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((res) => {
        console.log(`You're in!`);
        this.changePersistence();
        this._snackBar.open('Conta logada com sucesso! ☕', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.router.navigate(['/order-list']);
      })
      .catch((err) => {
        this._snackBar.open('Algum dado está errado! 😥️', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
        });
        console.log('Something went wrong:', err.message);
      });
  }

  signOut() {
    signOut(this.auth).then((res) => {
      this._snackBar.open('Logout executado, até logo! 😊', undefined, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
      this.router.navigate(['/login']);
    });
  }

  recoveryPassword(email: string) {
    sendPasswordResetEmail(this.auth, email).then(() => {
      this._snackBar.open(
        'E-Mail enviado com a troca da senha! 📨',
        undefined,
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
        }
      );
      this.router.navigate(['/login']);
    });
  }

  isUserLogged(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.changePersistence();
          const uid = user.uid;
          resolve(true);
        } else {
          resolve(false);
          // User is signed out
          // ...
        }
      });
    });
  }

  changePersistence() {
    setPersistence(this.auth, browserSessionPersistence).then(() => {});
  }

  async registerUserAtFirestore(user: any, uid: string) {
    let objToSend = {
      uid: uid,
      name: user.name,
      email: user.email,
      avatar: '',
    };
    objToSend.avatar = await this.fileUpload.uploadAvatar(user.avatar, uid);
    try {
      const docRef = await addDoc(collection(this.db, 'users'), objToSend);
      this.router.navigate(['/login']);
      this._snackBar.open('Conta criada com sucesso! 👍', undefined, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
    } catch (e) {
      console.error('Erro=>', e);
    }
  }

  async getUser() {
    const q = await query(
      collection(this.db, 'users'),
      where('uid', '==', this.auth.currentUser?.uid)
    );

    const querySnapshot = await getDocs(q);

    let objectToReturn = querySnapshot.docs.map((doc) => doc.data());
    return objectToReturn[0] as User;
  }
}
