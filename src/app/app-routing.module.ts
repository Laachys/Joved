import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { authGuard } from './guards/auth.guard';
import { NewproductComponent } from './modules/newproduct/newproduct.component';
import { InfoproductComponent } from './shared/components/infoproduct/infoproduct.component';
import { ProductComponent } from './modules/product/product.component';
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
  {
    path : '' , component: HomeComponent
  },
  {
    path : 'login' , component: LoginComponent
  },
  {
    path : 'register' , component: RegisterComponent
  },
  {
    path: 'home', component:HomeComponent
  },
  {
    path: 'categories/:category', component:CategoriesComponent
  },
  {
    path: 'categories/:category/:pag', component:CategoriesComponent
  },
  {
    path: 'newproduct', component:NewproductComponent , canActivate: [authGuard]
  },
  {
    path: 'categories/:category/:pag/:id_product', component: ProductComponent
  },
  {
    path: 'product/:id_product', component: ProductComponent
  },
  {
    path: 'profile', component:ProfileComponent , canActivate: [authGuard]
  },
];

// , canActivate: [authGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
