import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CategoriesComponent } from './categories/categories.component';
import { SharedNavbarComponent } from '../shared/components/shared-navbar/shared-navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgbCarouselModule, } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NewproductComponent } from './newproduct/newproduct.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from '../shared/components/products/products.component';
import { ProductComponent } from './product/product.component';
import { InfoproductComponent } from '../shared/components/infoproduct/infoproduct.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE4aNIVyoTuoAsJ2jju9m6dSOBCvlW8Y0",
  authDomain: "joved-60bf1.firebaseapp.com",
  projectId: "joved-60bf1",
  storageBucket: "joved-60bf1.appspot.com",
  messagingSenderId: "629001745877",
  appId: "1:629001745877:web:148dfed3e19944150b395c",
  measurementId: "G-SGVX87SDKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// import Swiper from 'swiper';
//import { SwiperModule } from 'swiper/angular';
// import { Navigation, Pagination } from 'swiper/modules';

// const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   }

// // });
// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 3,
//   centeredSlides: true,
//   spaceBetween: 30,
//   pagination: {
//     el: ".swiper-pagination",
//     type: "fraction",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoriesComponent,
    SharedNavbarComponent,
    NewproductComponent,
    ProductsComponent,
    ProductComponent,
    InfoproductComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    NgbCarouselModule,
    NgxDropzoneModule,
    MatSelectModule,
    NgxPaginationModule,
    NgbAlertModule,
    NgbAccordionModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatTabsModule,
    MatStepperModule

  ],
   exports: [LoginComponent, RegisterComponent, HomeComponent]


})
export class ModulesModule {
  hide = true;
 }
