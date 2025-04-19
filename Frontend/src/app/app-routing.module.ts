import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent // This is your root page, no auth required
    },
    {
        path: ':invite/:groupid/login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
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
                path: 'my-profile',
                component: MyProfileComponent
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
    {
        path: '**',
        redirectTo: ''
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
