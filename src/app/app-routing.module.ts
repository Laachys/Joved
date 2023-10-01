import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { authGuard } from './guards/auth.guard';

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
    path: 'categories', component:CategoriesComponent
  },
  {
    path: 'newproduct', component:CategoriesComponent, canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
