import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/admin/blog/blog.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { OrderComponent } from './components/admin/order/order.component';
import { ProductComponent } from './components/admin/product/product.component';
import { TagComponent } from './components/admin/tag/tag.component';
import { BlogClientComponent } from './components/client/blog-client/blog-client.component';
import { BlogDetailComponent } from './components/client/blog-detail/blog-detail.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { HomeComponent } from './components/client/home/home.component';
import { IndexComponent } from './components/client/index/index.component';
import { LoginPageComponent } from './components/client/login-page/login-page.component';
import { MyOrderComponent } from './components/client/my-order/my-order.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { SearchComponent } from './components/client/search/search.component';
import { ShopComponent } from './components/client/shop/shop.component';
import { UserDetailComponent } from './components/client/user-detail/user-detail.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { RoleGuardService } from './_service/role-guard.service';
import { ChartsComponent } from './components/admin/charts/charts.component';
import { EmailVerificationComponent } from './components/client/email-verification/email-verification.component';
import { ChitietComponent } from './components/admin/chitiet/chitiet.component';
import { OrderchitietComponent } from './components/client/orderchitiet/orderchitiet.component';
import { AccountComponent } from './components/admin/account/account.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { CheckPayComponent } from './components/client/check-pay/checkpay.component';
const routes: Routes = [
  {
    path: 'admin',component:DashboardComponent,
    canActivate: [RoleGuardService],
    data: {expectedRole: "ROLE_ADMIN"},
    children:[
      {path:"category",component: CategoryComponent},
      {path:'product',component:ProductComponent},
      {path:'order',component:OrderComponent},
      {path:'blog',component:BlogComponent},
      {path:'tag',component:TagComponent},
      {path:'charts',component:ChartsComponent},
      {path:'chitiet/:id',component:ChitietComponent},
      {path:'thongtin',component:AccountComponent},
    ]
  },
  {
    path:'',component: IndexComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'cart',component: CartComponent},
      {path:'checkout',component: CheckoutComponent,canActivate: [AuthGuardService]},
      {path:'category/:id',component: ShopComponent},
      {path:'product/:id',component:ProductDetailComponent},
      {path:'blog',component: BlogClientComponent},
      {path:'blog/:id',component:BlogDetailComponent},
      {path:'email-verification',component:EmailVerificationComponent},
      {path:'user',component:UserDetailComponent,canActivate: [AuthGuardService]},
      {path:'my-order',component:MyOrderComponent,canActivate: [AuthGuardService]},
      {path:'orderchitiet/:id',component:OrderchitietComponent,canActivate: [AuthGuardService]},
      {path:'search/:keyword',component:SearchComponent},
      {path:'contact',component:ContactComponent},
      { path: 'check-pay', component: CheckPayComponent }
    ]
  },
  {path:'login',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
