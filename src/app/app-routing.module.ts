import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReggOneComponent } from './components/Brand/regg-one/regg-one.component';
import { RegisterComponent } from './components/Brand/register/register.component';
import { RegThreeComponent } from './components/Brand/reg-three/reg-three.component';
import { LoginBrandComponent } from './components/Brand/loginbrand/login-brand.component';
import { ForgetPasswordBrandComponent } from './components/Brand/forget-password-brand/forget-password-brand.component';
import { ChangePasswordBrandComponent } from './components/Brand/change-password-brand/change-password-brand.component';
import { CartComponent } from './components/User/cart/cart.component';
import { ProductDetailsComponent } from './components/User/product-details/product-details.component';
import { MembershipComponent } from './components/Brand/membership/membership.component';
import { LoginAdminComponent } from './components/Admin/loginadmin/login-admin.component';
import { ForgetPasswordAdminComponent } from './components/Admin/forgetpasswordadmin/forget-password-admin.component';
import { ChangePasswordAdminComponent } from './components/Admin/changepasswordadmin/change-password-admin.component';
import {  WaitingDashBoardComponent } from './components/Brand/waiting-dashboard/waiting-dashboardcomponent';
import { HomeComponent } from './components/User/home/home.component';
import { CategoriesComponent } from './components/User/categories/categories.component';
import { BrandMainComponent } from './components/Brand/brand-main/brand-main.component';
import {  LoginUserComponent } from './components/User/login-user/login-user.component';
import { SignupComponent} from './components/User/signup/signup.component';
import { BrandProfileComponent } from './components/Brand/brand-profile/brand-profile.component'
import { ProductsComponent } from './components/User/products/products.component';
import { CreatePromocodeComponent } from './components/Brand/promocode/create-promocode/create-promocode.component';
import { PromocodeHistoryComponent } from './components/Brand/promocode/promocode-history/promocode-history.component';
import { EditPromocodeComponent } from './components/Brand/promocode/edit-promocode/edit-promocode.component';
import { TeamworkBasicComponent } from './components/Brand/teamwork/teamwork-basic/teamwork-basic.component';
import { TeamworkBrandComponent } from './components/Brand/teamwork/teamwork-brand/teamwork-brand.component';
import { TeamworkAddComponent } from './components/Brand/teamwork/teamwork-add/teamwork-add.component';
import { ChatsComponent } from './components/Brand/chats/chats.component';
import { SalesReportComponent } from './components/Brand/sales-report/sales-report.component';
import { SalesForBrandComponent } from './components/Brand/sales-for-brand/sales-for-brand.component';
import { MyProductsComponent } from './components/Brand/myProducts/my-products/my-products.component';
import { MyProductsAddComponent } from './components/Brand/myProducts/my-products-add/my-products-add.component';
import { MyProductsReportComponent } from './components/Brand/myProducts/my-products-report/my-products-report.component';
import { MyProductsDetailsComponent } from './components/Brand/myProducts/my-products-details/my-products-details.component';
import { OrdersComponent } from './components/Brand/brand-orders/orders/orders.component';
import { OrderDetailsComponent } from './components/Brand/brand-orders/order-details/order-details.component';
import { HomeNavbarComponent } from './components/User/home-navbar/home-navbar.component';
import { CollectionsComponent } from './components/User/collections/collections.component';
import { ManageAccountComponent } from './components/User/manage-account/manage-account.component';
import { ContactComponent } from './components/User/contact/contact.component';
import { FavoritesComponent } from './components/User/favorites/favorites.component';
import { AboutComponent } from './components/User/about/about.component';
import { ProductPageComponent } from './components/User/product-page/product-page.component';
import { EmptyCartComponent } from './components/User/empty-cart/empty-cart.component';
import { PaymentResultComponent } from './components/Brand/payment-result/payment-result.component';
import { UserOrdersComponent } from './components/User/user-orders/user-orders.component';



  
 








const routes: Routes = [
   { path: '', redirectTo: 'loginbrand', pathMatch: 'full' },
  {path: 'reggone', component: ReggOneComponent},
   {path:"register", component:RegisterComponent},
   {path:'reg-three',component:RegThreeComponent},
   {path:'forgetpasswordbrand',component:ForgetPasswordBrandComponent},
   {path:'changepasswordbrand',component:ChangePasswordBrandComponent},
   {path:'cart',component:CartComponent},
   {path:'product-details',component:ProductDetailsComponent},
   {path:'membership',component:MembershipComponent},
   {path:'loginadmin',component:LoginAdminComponent},
   {path:'forgetpasswordadmin',component:ForgetPasswordAdminComponent},
   {path:'changepasswordadmin',component:ChangePasswordAdminComponent},
   {path:'loginbrand',component:LoginBrandComponent},
   {path: 'waitingdashboard',component: WaitingDashBoardComponent},
   {path: 'homeuser', component: HomeComponent },
   {path: 'products', component: ProductsComponent },
   {path: 'user', component: CategoriesComponent },
   {path: 'loginuser', component: LoginUserComponent},
   {path: 'signup', component: SignupComponent },
   {path: 'brand-main', component: BrandMainComponent},
   {path: 'brand-profile', component: BrandProfileComponent},
   {path: 'create-promocode', component: CreatePromocodeComponent},
   { path: 'promocode-history', component: PromocodeHistoryComponent },
   { path: 'edit-promocode', component: EditPromocodeComponent },
   { path: 'teamwork-basic', component: TeamworkBasicComponent },
   { path: 'teamwork-brand', component: TeamworkBrandComponent },
   { path: 'teamwork-add', component: TeamworkAddComponent },
   { path: 'chats', component: ChatsComponent },
   {  path: 'brand-sales-report/:brandId/:month/:year', component: SalesReportComponent },
   { path: 'sales-for-brand', component: SalesForBrandComponent },
   { path: 'my-products', component:MyProductsComponent},
   { path: 'my-products-add', component:MyProductsAddComponent},
   { path: 'my-products-report', component:MyProductsReportComponent},
   { path: 'my-product-details', component:MyProductsDetailsComponent},
   { path: 'orders', component:OrdersComponent},
   { path: 'order-details/:id', component:OrderDetailsComponent},
   { path: 'home-navbar', component:HomeNavbarComponent},
   { path: 'user-orders', component:UserOrdersComponent},
   { path: 'collections', component:CollectionsComponent},
   { path: 'manage-account', component:ManageAccountComponent},
   { path: 'contact', component:ContactComponent},
   { path: 'favorites', component:FavoritesComponent},
   { path: 'about', component:AboutComponent},
   { path: 'product-page', component:ProductPageComponent},
   { path: 'empty-cart', component:EmptyCartComponent},
   { path: 'payment-result', component:PaymentResultComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
