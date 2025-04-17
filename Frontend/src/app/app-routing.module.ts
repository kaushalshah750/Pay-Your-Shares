import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { CreditCardComponent } from './shared/credit-card/credit-card.component';
import { GroupListComponent } from './shared/groups/group-list/group-list.component';
import { LoginComponent } from './shared/login/login.component';
import { MyProfileComponent } from './shared/my-profile/my-profile.component';
import { PaymentSlipComponent } from './shared/payments/payment-slip/payment-slip.component';
import { PaymentSummaryComponent } from './shared/payments/payment-summary/payment-summary.component';
import { UsersComponent } from './shared/users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'login/:invite/:groupid/login',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'group',
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'my-profile',
                component: MyProfileComponent
            },
            {
                path: 'group',
                component: GroupListComponent
            },
            {
                path: 'group/:groupid/payment',
                component: PaymentSlipComponent
            },
            {
                path: 'group/payment/summary',
                component: PaymentSummaryComponent
            },
            {
                path: 'group/:groupid/payment/summary',
                component: PaymentSummaryComponent
            },
            {
                path: 'counter',
                component: CounterComponent
            },
            {
                path: 'summary',
                component: PaymentSummaryComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'credit-card',
                component: CreditCardComponent
            },
            {
                path: 'fetch-data',
                component: FetchDataComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
