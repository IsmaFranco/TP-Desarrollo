import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BagComponent } from './pages/bag/bag.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { EditPriceComponent } from './pages/edit-price/edit-price.component';
import { AddStockComponent } from './pages/add-stock/add-stock.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { UserPurchasesComponent } from './pages/user-purchases/user-purchases.component';
import { SuccessComponent } from './pages/success/success.component';
import { LocalitiesComponent } from './pages/localities/localities.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PendingPurchasesComponent } from './pages/pending-purchases/pending-purchases.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search/:desc', component: HomeComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'bag', component: BagComponent},
    {path: 'new-item', component: NewItemComponent},
    {path: 'edit-price/:id', component: EditPriceComponent},
    {path: 'add-stock/:id', component: AddStockComponent},
    {path: 'purchases', component: PurchasesComponent},
    {path: 'user-purchases', component: UserPurchasesComponent},
    {path: 'success', component: SuccessComponent},
    {path: 'localities', component: LocalitiesComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'pending-purchases', component: PendingPurchasesComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
