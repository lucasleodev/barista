import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  getStorage,
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  auth = getAuth();
  storage = getStorage();
  storageRef = ref(this.storage);
  avatarRef = ref(this.storage, 'avatar');

  constructor(
    private fireAuth: Auth,
    private firestore: Firestore,
    private fireStorage: Storage
  ) {}

  async uploadAvatar(file: File, uid: string): Promise<string> {
    let avatarUrl = '';
    this.avatarRef = ref(this.storage, `avatar/${uid}${file.name}`);
    await uploadBytes(this.avatarRef, file).then(async (snapshot) => {
      await getDownloadURL(this.avatarRef).then((url) => {
        avatarUrl = url;
      });
      console.log('Uploaded a blob or file!');
    });
    return avatarUrl;
  }
}
