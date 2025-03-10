import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BagComponent } from './pages/bag/bag.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { EditPriceComponent } from './pages/edit-price/edit-price.component';
import { AddStockComponent } from './pages/add-stock/add-stock.component';
import { PayComponent } from './pages/pay/pay.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { UserPurchasesComponent } from './pages/user-purchases/user-purchases.component';
import { SuccessComponent } from './pages/success/success.component';
import { NewLocalityComponent } from './pages/new-locality/new-locality.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'bag', component: BagComponent},
    {path: 'new-item', component: NewItemComponent},
    {path: 'edit-price/:id', component: EditPriceComponent},
    {path: 'add-stock/:id', component: AddStockComponent},
    {path: 'pay', component: PayComponent},
    {path: 'purchases', component: PurchasesComponent},
    {path: 'user-purchases', component: UserPurchasesComponent},
    {path: 'success', component: SuccessComponent},
    {path: 'new-locality', component: NewLocalityComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
