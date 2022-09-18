import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

//Material Modules
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

//Services
import { OrdersService } from 'src/app/pages/shared/services/orders/orders.service';
import { AuthService } from 'src/app/pages/shared/services/auth/auth.service';
import { FileUploadService } from 'src/app/pages/shared/services/file-upload/file-upload.service';

//FlexyLayout
import { FlexLayoutModule } from '@angular/flex-layout';

//Angular Fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/login/signin/signin.component';
import { SignupComponent } from './pages/login/signup/signup.component';
import { RecoveryPasswordComponent } from './pages/login/recovery-password/recovery-password.component';
import { ModalComponent } from './pages/shared/components/modal/modal.component';
import { DeleteModalComponent } from './pages/shared/components/delete-modal/delete-modal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderListComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    RecoveryPasswordComponent,
    ModalComponent,
    DeleteModalComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMatFileInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
  providers: [OrdersService, AuthService, FileUploadService],
  bootstrap: [AppComponent],
})
export class AppModule {}
