import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

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
import { SnackbarComponent } from './shared/Dialog/snackbar/snackbar.component';
import { MyProfileComponent } from './shared/my-profile/my-profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConfirmationComponent } from './shared/Dialog/confirmation/confirmation.component';
import { PaymentSettlementComponent } from './shared/Dialog/payments/payment-settlement/payment-settlement.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CreditCardComponent,
        PaymentSummaryComponent,
        FetchDataComponent,
        CreateSlipComponent,
        PaymentSettlementComponent,
        CreateGroupComponent,
        LoginComponent,
        WelcomeComponent,
        SnackbarComponent,
        SplitPaymentComponent,
        PaymentSlipComponent,
        GroupListComponent,
        MyProfileComponent,
        AddGroupMemberComponent,
        GiveFeedbackComponent,
        ConfirmationComponent,
        UsersComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        MatTableModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right'
        }),
    ],
    providers: [
        DatePipe,
        CurrencyPipe,
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
                verticalPosition: "top",
                horizontalPosition: "right"
            }
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
