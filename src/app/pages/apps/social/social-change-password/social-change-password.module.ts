import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RelativeDateTimeModule} from '../../../../../@vex/pipes/relative-date-time/relative-date-time.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SocialChangePasswordRoutingModule} from './social-change-password-routing.module';
import {SocialChangePasswordComponent} from './social-change-password.component';


@NgModule({
    declarations: [SocialChangePasswordComponent],
    imports: [
        CommonModule,
        SocialChangePasswordRoutingModule,
        FlexLayoutModule,
        MatTabsModule,
        MatIconModule,
        IconModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule,
        RelativeDateTimeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
    ]
})
export class SocialChangePasswordModule {
}
