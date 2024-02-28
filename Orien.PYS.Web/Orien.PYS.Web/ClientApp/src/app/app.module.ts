import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CreditCardComponent } from './shared/credit-card/credit-card.component';
import { PaymentSummaryComponent } from './shared/payments/payment-summary/payment-summary.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UsersComponent } from './shared/users/users.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateSlipComponent } from './shared/Dialog/create-slip/create-slip.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CreateGroupComponent } from './shared/Dialog/create-group/create-group.component';
import { LoginComponent } from './shared/login/login.component';
import { SplitPaymentComponent } from './shared/split-payment/split-payment.component';
import { GroupListComponent } from './shared/groups/group-list/group-list.component';
import { PaymentSlipComponent } from './shared/payments/payment-slip/payment-slip.component';
import { AddGroupMemberComponent } from './shared/Dialog/add-group-member/add-group-member.component';
import { GiveFeedbackComponent } from './shared/Dialog/give-feedback/give-feedback.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    CreditCardComponent,
    PaymentSummaryComponent,
    FetchDataComponent,
    CreateSlipComponent,
    CreateGroupComponent,
    LoginComponent,
    SplitPaymentComponent,
    PaymentSlipComponent,
    GroupListComponent,
    AddGroupMemberComponent,
    GiveFeedbackComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule, 
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    }),
    RouterModule.forRoot([
      {
        path: ':invite/:groupid/login',
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
        children:[
          {
            path: 'group',
            component: GroupListComponent
          },
          {
            path: 'group/:groupid/payment',
            component: PaymentSlipComponent    
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
    ])
  ],
  providers: [
      DatePipe,
      CurrencyPipe,
      {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500, verticalPosition: "top", horizontalPosition: "right"}}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
